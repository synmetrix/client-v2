import { createClient, fetchExchange, subscriptionExchange } from "urql";
import { authExchange } from "@urql/exchange-auth";
import { retryExchange } from "@urql/exchange-retry";
import { createClient as createWsClient } from "graphql-ws";
import { history } from "@vitjs/runtime";

import { fetchRefreshToken } from "@/hooks/useAuth";
import AuthTokensStore from "@/stores/AuthTokensStore";

import type { Operation, CombinedError } from "urql";
import type { SubscribePayload } from "graphql-ws";

const HASURA_GRAPHQL_ENDPOINT = import.meta.env.VITE_HASURA_GRAPHQL_ENDPOINT;
const HASURA_WS_ENDPOINT = import.meta.env.VITE_HASURA_WS_ENDPOINT;

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
      url: HASURA_WS_ENDPOINT,
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
              history.push("/auth/signin");
              return;
            }

            setAuthData({
              accessToken: result.jwt_token,
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
  }, [JWTpayload, accessToken, refreshToken, setAuthData]);

  return client;
};
