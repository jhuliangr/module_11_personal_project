import { create } from "zustand";

import { type SettingsStore } from "./SettingsStoreType";

export const useSettingsStore = create<SettingsStore>()((set) => ({
  amountOfPoints: 1000,
  setAmountOfPoints: (newAmount) => set({ amountOfPoints: newAmount }),
  strokeWidth: 1.2,
  setStrokeWidth: (newWidth) => set({ strokeWidth: newWidth }),
}));
