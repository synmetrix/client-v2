import { useMemo } from "react";
import { getOr } from "unchanged";

import CurrentUserStore from "@/stores/CurrentUserStore";
import ErrorFound from "@/components/ErrorFound";

const usePermissions = ({ scope = "" }) => {
  let fallback = null;

  const { currentUser } = CurrentUserStore();
  const cachedRestrictScopes = (
    localStorage.getItem("restrictScopes") || ""
  ).split(",");
  const restrictScopes = useMemo(
    () => getOr(cachedRestrictScopes, "ACL.restrictScopes", currentUser),
    [currentUser, cachedRestrictScopes]
  );

  if (restrictScopes.includes(scope)) {
    fallback = <ErrorFound status={403} />;
  }

  const saveCachedRestrictScopes = (scopes = []) =>
    localStorage.setItem("restrictScopes", scopes.join(","));

  return {
    fallback,
    restrictScopes,
    saveCachedRestrictScopes,
  };
};

export default usePermissions;
