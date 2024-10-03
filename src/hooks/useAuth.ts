import AuthTokensStore from "@/stores/AuthTokensStore";
import type { SignInFormType } from "@/components/SignInForm";
import type { SignUpFormType } from "@/components/SignUpForm";
import type { LdapLoginOutput } from "@/graphql/generated";
import { useLdapLoginMutation } from "@/graphql/generated";

const VITE_GRAPHQL_PLUS_SERVER_URL =
  window.GRAPHQL_PLUS_SERVER_URL !== undefined
    ? window.GRAPHQL_PLUS_SERVER_URL
    : import.meta.env.VITE_GRAPHQL_PLUS_SERVER_URL;

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
  magicLink?: boolean;
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
    `${VITE_GRAPHQL_PLUS_SERVER_URL}/auth/token/refresh?refresh_token=${refreshToken}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return (await validateResponse(response)) as AuthResponse;
};

export default () => {
  const { refreshToken, accessToken, setAuthData } = AuthTokensStore();
  const [, execLDAPLoginMutation] = useLdapLoginMutation();

  const login = async (values: SignInFormType) => {
    const credentials = { email: values.email, password: values.password };
    let res;

    if (values.useLDAP) {
      const result = await execLDAPLoginMutation({
        username: credentials.email,
        password: credentials.password || "",
      });

      const LDAPResponse: LdapLoginOutput | null =
        result?.data?.ldap_login || null;

      if (LDAPResponse?.errorMessage) {
        return {
          message: LDAPResponse?.errorMessage,
        };
      }

      res = {
        jwt_token: LDAPResponse?.data?.accessToken,
        refresh_token: LDAPResponse?.data?.refreshToken,
      };
    } else {
      const response = await fetch(
        `${VITE_GRAPHQL_PLUS_SERVER_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...credentials,
            cookie: false,
          }),
        }
      );
      res = <AuthResponse>await validateResponse(response);
    }

    if (res.error) {
      return {
        error: res.error,
        message: res.message,
      };
    }

    if (res?.jwt_token && res?.refresh_token) {
      setAuthData({
        accessToken: res.jwt_token,
        refreshToken: res.refresh_token,
      });
    }

    return {
      magicLink: res?.magicLink,
    };
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

  const sendMagicLink = async ({ email }: SignUpFormType) => {
    const response = await fetch(
      `${VITE_GRAPHQL_PLUS_SERVER_URL}/auth/register`,
      {
        method: "POST",
        body: JSON.stringify({ email, cookie: false }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
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

    return res;
  };

  return {
    login,
    register,
    logout,
    changePass,
    sendMagicLink,
  };
};
