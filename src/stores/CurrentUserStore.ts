import { create } from "zustand";

import type { User } from "@/types/user";
import type { Team } from "@/types/team";

const LOADING_TIMEOUT = 5000; // 5 seconds
export const LAST_TEAM_ID_KEY = "lastTeamId";

interface CurrentUser {
  loading: boolean;
  currentTeam: Team | null;
  currentUser: User;
  teamData: any | null;
  setTeamData: (teamData: any) => void;
  setLoading: (value: boolean) => void;
  setUserData: (currentUser: User) => void;
  setCurrentTeam: (id: string) => void;
}

const CurrentUserStore = create<CurrentUser>((set, get) => ({
  loading: false,
  currentUser: {
    teams: [],
  } as unknown as User,
  currentTeam: null,
  teamData: null,
  setTeamData: (teamData: any) => set({ teamData, loading: false }),
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
    set({ currentUser, loading: false });
  },
  setCurrentTeam(id: string) {
    const state = get();
    const team = state?.currentUser?.teams?.find((t) => t.id === id);

    if (team) {
      localStorage.setItem(LAST_TEAM_ID_KEY, id);
      set({ currentTeam: team });
    } else {
      localStorage.removeItem(LAST_TEAM_ID_KEY);
    }

    set({ loading: false });
  },
}));

export default CurrentUserStore;
