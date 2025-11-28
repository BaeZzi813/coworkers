import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarStore {
  isFold: boolean;
  setFold: (isFold: boolean) => void;
  toggleFold: () => void;
  isDropdownOpen: boolean;
  toggleDropdownOpen: () => void;
}

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set) => ({
      isFold: false,
      setFold: (isFold: boolean) => set(() => ({ isFold: isFold })),
      toggleFold: () => set((state) => ({ isFold: !state.isFold })),
      isDropdownOpen: true,
      toggleDropdownOpen: () =>
        set((state) => ({ isDropdownOpen: !state.isDropdownOpen })),
    }),
    {
      name: "sidebar-fold-storage",
    }
  )
);
