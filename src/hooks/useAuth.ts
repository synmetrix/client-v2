import AuthTokensStore from "@/stores/AuthTokensStore";
import type { SignInFormType } from "@/components/SignInForm";
import type { SignUpFormType } from "@/components/SignUpForm";

const VITE_GRAPHQL_PLUS_SERVER_URL = import.meta.env
  .VITE_GRAPHQL_PLUS_SERVER_URL;

type Response = {
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

export const fetchRefreshToken = async (refreshToken: string) => {
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

  const login = async (values: SignInFormType) => {
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

    const res = <Response>await validateResponse(response);

    if (res.error) {
      return {
        error: res.error,
        message: res.message,
      };
    }

    authTokensState.setRefreshToken(res.refresh_token);
    authTokensState.setAccessToken(res.jwt_token);
  };

  const register = async (values: SignUpFormType) => {
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

    const res = <Response>await validateResponse(response);

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
