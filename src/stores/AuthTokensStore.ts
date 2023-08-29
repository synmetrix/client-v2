import { create } from "zustand";
import { persist } from "zustand/middleware";
import jwtDecode from "jwt-decode";

import type { JwtPayload } from "jwt-decode";

interface HasuraJWTPayload extends JwtPayload {
  "x-hasura-role": string;
  "x-hasura-user-id": string;
}

interface Payload extends JwtPayload {
  hasura?: HasuraJWTPayload | null;
}

type AuthData = {
  refreshToken: string;
  accessToken: string;
};

interface TokensState {
  refreshToken: string | null;
  accessToken: string | null;
  JWTpayload: HasuraJWTPayload | null;
  setAuthData: (authData: AuthData) => void;
  cleanTokens: () => void;
}

const defaultTokens = {
  refreshToken: null,
  accessToken: null,
  JWTpayload: null,
};

const AuthTokensStore = create<TokensState>()(
  persist(
    (set) => ({
      ...defaultTokens,
      setAuthData: (authData: AuthData) => {
        const { accessToken, refreshToken } = authData;
        const payload = jwtDecode<Payload>(accessToken);

        const JWTpayload = {
          ...payload,
          ...payload.hasura,
        };
        delete JWTpayload.hasura;

        const newData = {
          refreshToken,
          accessToken,
          JWTpayload,
        } as TokensState;

        set(newData);
      },
      cleanTokens: () => set({ ...defaultTokens }),
    }),
    {
      name: "tokens",
      getStorage: () => localStorage,
    }
  )
);

export default AuthTokensStore;
