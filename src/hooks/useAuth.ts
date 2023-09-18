import AuthTokensStore from "@/stores/AuthTokensStore";
import type { SignInFormType } from "@/components/SignInForm";
import type { SignUpFormType } from "@/components/SignUpForm";

const VITE_GRAPHQL_PLUS_SERVER_URL = import.meta.env
  .VITE_GRAPHQL_PLUS_SERVER_URL;

type Response = {
  statusCode?: number;
  error?: string;
  message?: string;
};

type AuthResponse = {
  jwt_token: string;
  refresh_token: string;
  statusCode?: number;
  error?: string;
  message?: string;
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
  const { refreshToken, accessToken, setAuthData } = AuthTokensStore();

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

    const res = <AuthResponse>await validateResponse(response);

    if (res.error) {
      return {
        error: res.error,
        message: res.message,
      };
    }

    setAuthData({
      accessToken: res.jwt_token,
      refreshToken: res.refresh_token,
    });
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

    const res = <AuthResponse>await validateResponse(response);

    if (res.error) {
      return {
        error: res.error,
        message: res.message,
      };
    }

    setAuthData({
      accessToken: res.jwt_token,
      refreshToken: res.refresh_token,
    });
  };

  const logout = async () => {
    const response = await fetch(
      `${VITE_GRAPHQL_PLUS_SERVER_URL}/auth/logout?refresh_token=${refreshToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          all: true,
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

    return res;
  };

  const changePass = async (values: any) => {
    const response = await fetch(
      `${VITE_GRAPHQL_PLUS_SERVER_URL}/auth/change-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(values),
      }
    );

    const res = <Response>await validateResponse(response);

    if (res.error) {
      return {
        error: res.error,
        message: res.message,
      };
    }

    return res;
  };

  return {
    login,
    register,
    logout,
    changePass,
  };
};
