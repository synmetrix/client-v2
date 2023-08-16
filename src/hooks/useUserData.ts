import { useEffect } from "react";

import { useCurrentUserLazyQuery } from "@/graphql/generated";
import AuthTokensStore from "@/stores/AuthTokensStore";
import CurrentUserStore from "@/stores/CurrentUserStore";
import type { User } from "@/types/user";

export default () => {
  const { currentUser, setUserData } = CurrentUserStore.getState();
  const { accessToken, JWTpayload } = AuthTokensStore.getState();

  const userId = JWTpayload?.["x-hasura-user-id"];

  const [execQueryCurrentUser, currentUserData] = useCurrentUserLazyQuery({
    variables: { id: userId },
  });

  useEffect(() => {
    const userData = currentUserData?.data?.users_by_pk;

    if (userData) {
      const newUserData = {
        id: userData.id,
        displayName: userData.display_name,
        avatar: userData?.avatar_url,
      } as User;

      setUserData(newUserData);
    }
  }, [currentUserData?.data?.users_by_pk, setUserData]);

  useEffect(() => {
    if (accessToken) {
      execQueryCurrentUser();
    }
  }, [accessToken, execQueryCurrentUser]);

  return {
    currentUser,
    queries: {
      currentUserData,
      execQueryCurrentUser,
    },
  };
};
