import { create } from "zustand";

import type { User } from "@/types/user";
import type { Team } from "@/types/team";

interface CurrentUser {
  currentTeamId: string | null;
  currentTeam: Team | null;
  currentUser: User;
  setUserData: (currentUser: User) => void;
  setCurrentTeamId: (teamId: string) => void;
}

const CurrentUserStore = create<CurrentUser>((set, get) => ({
  currentUser: {} as User,
  currentTeamId: localStorage.getItem("currentTeam"),
  currentTeam: null,
  setUserData: (currentUser: User) => {
    const state = get();

    if (state.currentTeamId && !state.currentTeam) {
      const currentTeam = currentUser.teams.find(
        (t) => t.id === state.currentTeamId
      );
      if (currentTeam) set({ currentTeam });
    }

    set({ currentUser });
  },
  setCurrentTeamId: (teamId: string) => {
    const state = get();
    const currentTeam = state.currentUser.teams.find((t) => t.id === teamId);

    localStorage.setItem("currentTeam", teamId);
    set({ currentTeamId: teamId, currentTeam });
  },
}));

export default CurrentUserStore;
