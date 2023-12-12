import useUserData from "@/hooks/useUserData";

import type { ReactNode } from "react";

export type UserDataLayoutProps = {
  children: ReactNode;
};

const UserDataLayout: React.FC<UserDataLayoutProps> = ({ children }) => {
  useUserData();

  return <>{children}</>;
};

export default UserDataLayout;
