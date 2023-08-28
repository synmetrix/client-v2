import { createClient, fetchExchange, subscriptionExchange } from "urql";
import { authExchange } from "@urql/exchange-auth";
import { SubscriptionClient } from "subscriptions-transport-ws";

import { fetchRefreshToken } from "@/hooks/useAuth";
import AuthTokensStore from "@/stores/AuthTokensStore";

import type { Operation, CombinedError } from "urql";

const HASURA_GRAPHQL_ENDPOINT = import.meta.env.VITE_HASURA_GRAPHQL_ENDPOINT;
const HASURA_WS_ENDPOINT = import.meta.env.VITE_HASURA_WS_ENDPOINT;

type Headers = {
  "content-type": string;
  "x-hasura-role"?: string;
  Authorization: string;
};

export default () => {
  const {
    accessToken,
    refreshToken,
    JWTpayload,
    setAccessToken,
    setRefreshToken,
  } = AuthTokensStore.getState();

  const client = useMemo(() => {
    const subscriptionClient = new SubscriptionClient(HASURA_WS_ENDPOINT, {
      reconnect: true,
      timeout: 30000,
      connectionParams: () => ({
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "content-type": "application/json",
        },
        lazy: true,
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
          const isValid = expirationTimeInSeconds >= now.getTime();

          return isValid;
        },
        didAuthError: (error: CombinedError) =>
          error?.graphQLErrors?.some((e) => e.extensions?.code === "FORBIDDEN"),
        refreshAuth: async () => {
          if (refreshToken) {
            const request = await fetchRefreshToken(refreshToken);
            const { access_token, refresh_token } = await request.json();

            setAccessToken(access_token);
            setRefreshToken(refresh_token);
          }
        },
      })),
      fetchExchange,
      subscriptionExchange({
        forwardSubscription: (operation) =>
          subscriptionClient.request(operation),
      }),
    ];

    return createClient({
      url: HASURA_GRAPHQL_ENDPOINT,
      exchanges,
    });
  }, [JWTpayload, accessToken, refreshToken, setAccessToken, setRefreshToken]);

  return client;
};
