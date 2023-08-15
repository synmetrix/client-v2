import AuthTokensStore from "@/stores/AuthTokensStore";

const VITE_GRAPHQL_PLUS_SERVER_URL = import.meta.env
  .VITE_GRAPHQL_PLUS_SERVER_URL;

type RegisterResponse = {
  jwt_token: string;
  refresh_token: string;
  statusCode: number;
  error: string;
  message: string;
};

export const validateResponse = async (response: any) => {
  let data = {};

  try {
    data = await response.json();
  } catch (err) {
    if (response.status === 204) {
      console.log("HTTP status: ", response.status);
      return {
        statusCode: response.status,
      };
    }

    return err;
  }

  return data;
};

export const fetchRefreshToken = async (refreshToken: any) => {
  return await fetch(
    `${VITE_GRAPHQL_PLUS_SERVER_URL}/auth/token/refresh?refresh_token=${refreshToken}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export default () => {
  const authTokensState = AuthTokensStore.getState();

  const login = async (values: any) => {
    const response = await fetch(`${VITE_GRAPHQL_PLUS_SERVER_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
        cookie: false,
      }),
    });

    const res = <any>await validateResponse(response);

    if (res.error) {
      return {
        error: res.error,
        message: res.message,
      };
    }

    authTokensState.setRefreshToken(res.refresh_token);
    authTokensState.setAccessToken(res.jwt_token);
  };

  const register = async (values: any) => {
    const response = await fetch(
      `${VITE_GRAPHQL_PLUS_SERVER_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          cookie: false,
        }),
      }
    );

    const res = <RegisterResponse>await validateResponse(response);

    if (res.error) {
      return {
        error: res.error,
        message: res.message,
      };
    }

    authTokensState.setRefreshToken(res.refresh_token);
    authTokensState.setAccessToken(res.jwt_token);
  };

  return {
    login,
    register,
  };
};
