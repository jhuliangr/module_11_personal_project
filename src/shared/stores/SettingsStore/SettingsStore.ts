import { create } from "zustand";

import { type SettingsStore } from "./SettingsStoreType";

export const useSettingsStore = create<SettingsStore>()((set, get) => ({
  amountOfPoints: 1000,
  setAmountOfPoints: (newAmount) => set({ amountOfPoints: newAmount }),
}));
