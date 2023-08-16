import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
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
  Authorization: string;
};

const HASURA_GRAPHQL_ENDPOINT = import.meta.env.VITE_HASURA_GRAPHQL_ENDPOINT;
const HASURA_WS_ENDPOINT = import.meta.env.VITE_HASURA_WS_ENDPOINT;

const getHeaders = () => {
  const headers = {} as Headers;
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

let wsLink;
const getOrCreateWebsocketLink = () => {
  wsLink ??= new GraphQLWsLink(
    createClient({
      url: HASURA_WS_ENDPOINT,
      connectionParams: {
        headers: getHeaders(),
      },
    })
  );

  return wsLink;
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
    },
  });
};

const createLink = () => {
  const httpLink = new HttpLink({
    uri: HASURA_GRAPHQL_ENDPOINT,
    credentials: "include",
  });

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        ...getHeaders(),
      },
    }));
    return forward(operation);
  });

  const refreshLink = makeTokenRefreshLink();

  if (typeof window !== "undefined") {
    return ApolloLink.from([
      refreshLink,
      authLink,
      // Use "getOrCreateWebsocketLink" to init WS lazily
      // otherwise WS connection will be created + used even if using "query"
      ApolloLink.split(
        operationIsSubscription,
        getOrCreateWebsocketLink,
        httpLink
      ),
    ]);
  } else {
    return ApolloLink.from([authLink, httpLink, refreshLink]);
  }
};

const createApolloClient = () => {
  const client = new ApolloClient({
    link: createLink(),
    cache: new InMemoryCache(),
  });

  return client;
};

export default createApolloClient;
