import { create } from "zustand";

interface UIState {
  navHidden: boolean;
  setNavHidden: (hidden: boolean) => void;
}

export const useNavStore = create<UIState>((set) => ({
  navHidden: false,
  setNavHidden: (hidden) => set({ navHidden: hidden }),
}));
