import { create } from 'zustand';
import type { Location } from 'react-router-dom';

interface ModalState {
  backgroundLocation: Location | null;
  setBackgroundLocation: (loc: Location) => void;
  clearBackgroundLocation: () => void;
}

export const useModalStore = create<ModalState>(set => ({
  backgroundLocation: null,
  setBackgroundLocation: loc => set({ backgroundLocation: loc }),
  clearBackgroundLocation: () => set({ backgroundLocation: null }),
}));
