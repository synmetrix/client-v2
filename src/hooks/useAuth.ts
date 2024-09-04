import AuthTokensStore from "@/stores/AuthTokensStore";
import type { SignInFormType } from "@/components/SignInForm";

// vite uses dev-proxy to make requests with changed origin
const KEYCLOAK_URL = import.meta.env.DEV
  ? `${window.location.origin}/keycloak`
  : import.meta.env.VITE_KEYCLOAK_URL;
const KEYCLOAK_REALM_URL = `${KEYCLOAK_URL}/realms/${
  import.meta.env.VITE_KEYCLOAK_REALM
}`;

type Response = {
  error?: string;
  error_description?: string;
};

type AuthResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in: number;
  token_type: string;
  "not-before-policy": number;
  session_state: string;
  scope: string;
  error?: string;
  error_description?: string;
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
  const response = await fetch(
    `${KEYCLOAK_REALM_URL}/protocol/openid-connect/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        refresh_token: refreshToken,
        grant_type: "password",
        client_id: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
      }),
    }
  );

  return (await validateResponse(response)) as AuthResponse;
};

export default () => {
  const { refreshToken, setAuthData } = AuthTokensStore();

  const login = async (values: SignInFormType) => {
    const response = await fetch(
      `${KEYCLOAK_REALM_URL}/protocol/openid-connect/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          ...values,
          grant_type: "password",
          client_id: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
        }),
      }
    );

    const res = <AuthResponse>await validateResponse(response);

    if (res.error) {
      return {
        error: res.error,
        message: res.error_description,
      };
    }

    if (res?.access_token && res?.refresh_token) {
      setAuthData({
        accessToken: res.access_token,
        refreshToken: res.refresh_token,
      });
    }

    return {
      accessToken: res.access_token,
    };
  };

  const logout = async () => {
    const response = await fetch(
      `${KEYCLOAK_REALM_URL}/protocol/openid-connect/logout?redirect_uri=${window.location.origin}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
          refresh_token: refreshToken || "",
        }),
      }
    );

    const res = <Response>await validateResponse(response);

    if (res.error) {
      return {
        error: res.error,
        message: res.error_description,
      };
    }

    return res;
  };

  return {
    login,
    logout,
  };
};
