import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarStore {
  isFold: boolean;
  setFold: (isFold: boolean) => void;
  toggle: () => void;
}

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set) => ({
      isFold: false,
      setFold: (isFold: boolean) => set(() => ({ isFold: isFold })),
      toggle: () => set((state) => ({ isFold: !state.isFold })),
    }),
    {
      name: "sidebar-fold-storage",
    }
  )
);
