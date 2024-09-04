import { authExchange } from "@urql/exchange-auth";
import { retryExchange } from "@urql/exchange-retry";
import { history } from "@vitjs/runtime";
import { createClient as createWsClient } from "graphql-ws";
import { createClient, fetchExchange, subscriptionExchange } from "urql";

import { fetchRefreshToken } from "@/hooks/useAuth";
import AuthTokensStore from "@/stores/AuthTokensStore";
import { SIGNIN } from "@/utils/constants/paths";

import type { SubscribePayload } from "graphql-ws";
import type { CombinedError, Operation } from "urql";

declare global {
  interface Window {
    HASURA_GRAPHQL_ENDPOINT?: string;
    HASURA_WS_ENDPOINT?: string;
  }
}

const HASURA_GRAPHQL_ENDPOINT =
  window.HASURA_GRAPHQL_ENDPOINT !== undefined
    ? window.HASURA_GRAPHQL_ENDPOINT
    : import.meta.env.VITE_HASURA_GRAPHQL_ENDPOINT;

const HASURA_WS_ENDPOINT =
  window.HASURA_WS_ENDPOINT !== undefined
    ? window.HASURA_WS_ENDPOINT
    : import.meta.env.VITE_HASURA_WS_ENDPOINT;

const getWsUrl = (path: string) => {
  // if url contains ws:// already
  if (path.includes("ws://") || path.includes("wss://")) {
    return path;
  }

  // if only the path
  const protocolPrefix = window.location.protocol === "https:" ? "wss:" : "ws:";
  return `${protocolPrefix}//${window.location.host}${path}`;
};

type Headers = {
  "content-type": string;
  "x-hasura-role"?: string;
  Authorization: string;
};

export default () => {
  const { accessToken, refreshToken, JWTpayload, setAuthData, cleanTokens } =
    AuthTokensStore();

  const client = useMemo(() => {
    const wsClient = createWsClient({
      url: getWsUrl(HASURA_WS_ENDPOINT),
      connectionParams: () => ({
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "content-type": "application/json",
        },
      }),
    });

    const exchanges = [
      authExchange(async (utils) => ({
        addAuthToOperation: (operation: Operation) => {
          if (!accessToken) return operation;

          const claims = { ...JWTpayload };
          const headers = {
            ...claims,
          } as Headers;

          // we could pass role inside operation
          const role = operation?.context?.role;
          if (role) {
            headers["x-hasura-role"] = role;
          } else {
            headers["x-hasura-role"] = "user";
          }

          if (headers["x-hasura-role"] !== "anonymous") {
            headers.Authorization = `Bearer ${accessToken}`;
          }

          return utils.appendHeaders(operation, headers);
        },
        willAuthError: () => {
          const expirationTimeInSeconds = (JWTpayload?.exp || 0) * 1000;
          const now = new Date();
          const isValid = expirationTimeInSeconds <= now.getTime();

          return isValid;
        },
        didAuthError: (error: CombinedError) => {
          return error?.graphQLErrors?.some(
            (e) => e.extensions?.code === "FORBIDDEN"
          );
        },
        refreshAuth: async () => {
          if (refreshToken) {
            const result = await fetchRefreshToken(refreshToken);

            if (result.error) {
              cleanTokens();
              history.push(SIGNIN);
              return;
            }

            setAuthData({
              accessToken: result.access_token,
              refreshToken: result.refresh_token,
            });
          }
        },
      })),
      retryExchange({
        initialDelayMs: 500,
        maxDelayMs: 1500,
        randomDelay: true,
        maxNumberAttempts: Infinity,
      }),
      fetchExchange,
      subscriptionExchange({
        forwardSubscription: (op) => ({
          subscribe: (sink) => ({
            unsubscribe: wsClient.subscribe(op as SubscribePayload, sink),
          }),
        }),
      }),
    ];

    return createClient({
      url: HASURA_GRAPHQL_ENDPOINT,
      exchanges,
    });
  }, [JWTpayload, accessToken, cleanTokens, refreshToken, setAuthData]);

  return client;
};
