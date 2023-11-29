import { create } from "zustand";

import type { User } from "@/types/user";
import type { Team } from "@/types/team";

const LOADING_TIMEOUT = 5000; // 5 seconds
interface CurrentUser {
  loading: boolean;
  currentTeamId: string | undefined;
  currentTeam: Team | null;
  currentUser: User;
  teamData: any | null;
  setTeamData: (teamData: any) => void;
  setLoading: (value: boolean) => void;
  setUserData: (currentUser: User) => void;
  setCurrentTeamId: (teamId: string) => void;
}

const CurrentUserStore = create<CurrentUser>((set, get) => ({
  loading: false,
  currentUser: {} as User,
  currentTeamId: localStorage.getItem("currentTeam") || undefined,
  currentTeam: null,
  teamData: null,
  setTeamData: (teamData: any) => set({ teamData }),
  setLoading: (value: boolean) => {
    set({ loading: value });

    setTimeout(() => {
      const state = get();

      if (state.loading) {
        set({ loading: false });
      }
    }, LOADING_TIMEOUT);
  },
  setUserData: (currentUser: User) => {
    const state = get();

    if (state.currentTeamId && currentUser.teams.length) {
      const currentTeam = currentUser.teams.find(
        (t) => t.id === state.currentTeamId
      );
      if (currentTeam) set({ currentTeam });
    }

    set({ currentUser, loading: false });
  },
  setCurrentTeamId: (teamId: string) => {
    const state = get();
    const currentTeam = state.currentUser.teams.find((t) => t.id === teamId);

    localStorage.setItem("currentTeam", teamId);
    set({ currentTeamId: teamId, currentTeam });
  },
}));

export default CurrentUserStore;
