import useUserData from "@/hooks/useUserData";

import type { ReactNode } from "react";

export type UserDataWrapperProps = {
  children: ReactNode;
};

const UserDataWapper: React.FC<UserDataWrapperProps> = ({ children }) => {
  useUserData();

  return <>{children}</>;
};

export default UserDataWapper;
