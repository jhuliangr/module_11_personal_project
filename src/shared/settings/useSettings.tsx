import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "settings";

type Settings = {
  amountOfPoints: number;
  strokeWidth: number;
};

const DEFAULTS: Settings = {
  amountOfPoints: 1000,
  strokeWidth: 1.2,
};

type SettingsContextValue = Settings & {
  setAmountOfPoints: (n: number) => void;
  setStrokeWidth: (n: number) => void;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);

  useEffect(() => {
    void (async () => {
      const cached = await AsyncStorage.getItem(STORAGE_KEY);
      if (!cached) return;
      const parsed = JSON.parse(cached) as Partial<Settings>;
      setSettings((prev) => ({ ...prev, ...parsed }));
    })();
  }, []);

  const update = (next: Partial<Settings>) => {
    setSettings((prev) => {
      const merged = { ...prev, ...next };
      void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      return merged;
    });
  };

  const value: SettingsContextValue = {
    amountOfPoints: settings.amountOfPoints,
    setAmountOfPoints: (n) => update({ amountOfPoints: n }),
    strokeWidth: settings.strokeWidth,
    setStrokeWidth: (n) => update({ strokeWidth: n }),
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextValue => {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error("useSettings must be used inside SettingsProvider");
  }
  return ctx;
};
