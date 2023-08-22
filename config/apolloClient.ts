import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
  split,
} from "@apollo/client";
import { history } from "@vitjs/runtime";
import { onError } from "@apollo/client/link/error";
import { ApolloLink } from "@apollo/client/core";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import { createClient } from "graphql-ws";
import decodeJWT from "jwt-decode";

import { fetchRefreshToken } from "@/hooks/useAuth";
import AuthTokensStore from "@/stores/AuthTokensStore";

import type { JwtPayload } from "jwt-decode";
import type { Operation } from "@apollo/client/link/core/types";

type Headers = {
  "content-type": string;
  "x-hasura-role"?: string;
  Authorization: string;
};

const HASURA_GRAPHQL_ENDPOINT = import.meta.env.VITE_HASURA_GRAPHQL_ENDPOINT;
const HASURA_WS_ENDPOINT = import.meta.env.VITE_HASURA_WS_ENDPOINT;

const getHeaders = () => {
  const headers = {
    "content-type": "application/json",
  } as Headers;

  const { accessToken } = AuthTokensStore.getState();
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;
  return headers;
};

const operationIsSubscription = (operation: Operation): boolean => {
  const definition = getMainDefinition(operation.query);
  const isSubscription =
    definition.kind === "OperationDefinition" &&
    definition.operation === "subscription";
  return isSubscription;
};

const makeTokenRefreshLink = () => {
  const authTokensState = AuthTokensStore.getState();

  return new TokenRefreshLink({
    isTokenValidOrUndefined: async () => {
      const token = authTokensState.accessToken;

      if (!token) return true;

      const claims: JwtPayload = decodeJWT(token);
      const expirationTimeInSeconds = (claims?.exp || 0) * 1000;
      const now = new Date();
      const isValid = expirationTimeInSeconds >= now.getTime();

      return isValid;
    },
    fetchAccessToken: async () => {
      const refreshToken = authTokensState.refreshToken;

      if (refreshToken) {
        const request = await fetchRefreshToken(refreshToken);
        return request.json();
      }
    },
    handleFetch: (accessToken) => authTokensState.setAccessToken(accessToken),
    handleResponse: () => (response: any) => {
      if (response.refresh_token) {
        authTokensState.setRefreshToken(response.refresh_token);
      }

      return { access_token: response.jwt_token };
    },
    handleError: (err) => {
      console.warn("Your refresh token is invalid. Try to reauthenticate.");
      console.error(err);

      authTokensState.cleanTokens();
      history.push("/signin");
    },
  });
};

const createLink = () => {
  const httpLink = new HttpLink({
    uri: HASURA_GRAPHQL_ENDPOINT,
  });

  const authLink = new ApolloLink((operation, forward) => {
    const headers = getHeaders();
    const context = operation.getContext();

    const role = context?.role;
    if (role) {
      headers["x-hasura-role"] = role;
    } else {
      headers["x-hasura-role"] = "user";
    }

    operation.setContext({ headers });
    return forward(operation);
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
      });

    if (networkError) {
      // @ts-ignore
      switch (networkError.statusCode) {
        case 401:
          console.error(`Error 401: logging user out`, "error");
          break;
        default:
          console.log(`[Network error]: ${networkError}`);
      }
    }
  });

  const wsLink = new GraphQLWsLink(
    createClient({
      url: HASURA_WS_ENDPOINT,
      connectionParams: () => ({
        headers: getHeaders(),
      }),
    })
  );

  const refreshLink = makeTokenRefreshLink();
  const mainLinkChain = from([refreshLink, errorLink, authLink, httpLink]);

  return split(operationIsSubscription, wsLink, mainLinkChain);
};

const createApolloClient = () => {
  const client = new ApolloClient({
    link: createLink(),
    cache: new InMemoryCache(),
  });

  return client;
};

export default createApolloClient;
