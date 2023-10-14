declare global {
  interface Window {
    GRAPHQL_WS_URL: string;
    AUTH_PREFIX: string;
    GRAPHQL_SERVER_URL: string;
    GRAPHQL_PLUS_SERVER_URL: string;
    CUBEJS_MYSQL_API_URL: string;
    CUBEJS_PG_API_URL: string;
  }
}

export const AUTH_PREFIX: string =
  window.AUTH_PREFIX || import.meta.env.AUTH_PREFIX;
export const GRAPHQL_SERVER_URL: string =
  window.GRAPHQL_SERVER_URL || import.meta.env.GRAPHQL_SERVER_URL;
export const GRAPHQL_PLUS_SERVER_URL: string =
  window.GRAPHQL_PLUS_SERVER_URL || import.meta.env.GRAPHQL_PLUS_SERVER_URL;
export const CUBEJS_MYSQL_API_URL: string =
  window.CUBEJS_MYSQL_API_URL || import.meta.env.CUBEJS_MYSQL_API_URL;
export const CUBEJS_PG_API_URL: string =
  window.CUBEJS_PG_API_URL || import.meta.env.CUBEJS_PG_API_URL;

const getWsUrl = (path: string) => {
  // if url contains ws:// already
  if (/ws/.test(path)) {
    return path;
  }

  // if only the path
  const protocolPrefix = window.location.protocol === "https:" ? "wss:" : "ws:";
  return `${protocolPrefix}//${window.location.host}${path}`;
};

export const GRAPHQL_WS_URL = getWsUrl(window.GRAPHQL_WS_URL || "");

export default () => {
  const withAuthPrefix = (path: string) => {
    let prefix = "";
    if (AUTH_PREFIX) {
      prefix = AUTH_PREFIX;
    }

    return `${prefix}${path}`;
  };

  return {
    withAuthPrefix,
  };
};
