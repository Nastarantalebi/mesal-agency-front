import { create } from "zustand";

interface FocusRowState {
  value: number | null;
  setFocusRow: (value: number | null) => void;
}

export const useFocusRowStore = create<FocusRowState>()((set) => ({
  value: null, // مقدار پیش‌فرض SSR

  setFocusRow: (value: number | null) => {
    set({ value });
  },
}));
