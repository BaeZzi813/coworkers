import { create } from "zustand";
import { combine } from "zustand/middleware";

const initialState = {
  isFold: false,
};

export const useSidebarStore = create(
  combine(initialState, (set) => ({
    toggle: () => set((state) => ({ isFold: !state.isFold })),
    setFold: (folded: boolean) => set(() => ({ isFold: folded })),
  }))
);
