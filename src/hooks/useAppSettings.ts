declare global {
  interface Window {
    GRAPHQL_WS_URL: any;
    AUTH_PREFIX: any;
    GRAPHQL_SERVER_URL: any;
    GRAPHQL_PLUS_SERVER_URL: any;
    CUBEJS_MYSQL_API_URL: any;
    CUBEJS_PG_API_URL: any;
  }
}

export const AUTH_PREFIX = window.AUTH_PREFIX || "";
export const GRAPHQL_SERVER_URL = window.GRAPHQL_SERVER_URL || "";
export const GRAPHQL_PLUS_SERVER_URL = window.GRAPHQL_PLUS_SERVER_URL || "";
export const CUBEJS_MYSQL_API_URL = window.CUBEJS_MYSQL_API_URL || "";
export const CUBEJS_PG_API_URL = window.CUBEJS_PG_API_URL || "";

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
