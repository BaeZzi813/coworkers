import { User } from "@/types/user";
import { create } from "zustand";

interface AuthState {
  accessToken: string;
  user: User | null;
  loggedIn: boolean;
}

interface AuthActions {
  logIn: ({ accessToken, user }: { accessToken: string; user: User }) => void;
  logOut: () => void;
  refreshToken: ({ accessToken }: { accessToken: string }) => void;
}

export const useAuthStore = create<AuthState & AuthActions>()((set) => ({
  accessToken: "",
  user: null,
  loggedIn: false,
  logIn: ({ accessToken, user }) => set({ accessToken, user, loggedIn: true }),
  logOut: () => set({ accessToken: "", user: null, loggedIn: false }),
  refreshToken: ({ accessToken }) => set({ accessToken }),
}));
