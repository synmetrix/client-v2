import { user } from "@/mocks/user";
import type { User } from "@/types/user";

export const useUserData: () => User = () => {
  // TODO get data from store
  return user;
};
