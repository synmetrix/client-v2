import { create } from "zustand";

import type { User } from "@/types/user";

interface CurrentUser {
  currentTeamId: string | null;
  currentUser: User;
  setUserData: (currentUser: User) => void;
  setCurrentTeam: (currentTeamId: string) => void;
}

const CurrentUserStore = create<CurrentUser>((set) => ({
  currentUser: {} as User,
  currentTeamId: null,
  setUserData: (currentUser: User) => set({ currentUser }),
  setCurrentTeam: (currentTeamId: string) => set({ currentTeamId }),
}));

export default CurrentUserStore;
