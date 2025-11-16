import { create } from "zustand";
import { combine } from "zustand/middleware";

const initialState = {
  loggedIn: true,
};

export const useAuthStore = create(
  combine(initialState, (set) => ({
    logIn: () => set({ loggedIn: true }),
    logOut: () => set({ loggedIn: false }),
  }))
);
