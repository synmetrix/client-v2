import { create } from "zustand";
import { persist } from "zustand/middleware";
import jwtDecode from "jwt-decode";

type HasuraJWTPayload = {
  "x-hasura-role": string[];
  "x-hasura-user-id": string;
};

type Payload = {
  hasura: HasuraJWTPayload;
};

interface TokensState {
  refreshToken: string | null;
  accessToken: string | null;
  JWTpayload: HasuraJWTPayload | null;
  setRefreshToken: (refreshToken: string) => void;
  setAccessToken: (accesToken: string) => void;
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
      setRefreshToken: (refreshToken) =>
        set((prev) => ({ ...prev, refreshToken })),
      setAccessToken: (accessToken) => {
        let payload: Payload;

        try {
          payload = jwtDecode(accessToken);
        } catch (err) {
          console.error("JWT is broken, reload the application data");
        }

        set((prev) => ({ ...prev, accessToken, JWTpayload: payload.hasura }));
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
