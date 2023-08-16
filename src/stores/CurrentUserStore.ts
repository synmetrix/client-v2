import { create } from "zustand";

import type { User } from "@/types/user";

interface CurrentUser {
  currentUser: User;
  setUserData: (currentUser: User) => void;
}

const CurrentUserStore = create<CurrentUser>((set) => ({
  currentUser: {} as User,
  setUserData: (currentUser: User) => set({ currentUser }),
}));

export default CurrentUserStore;
