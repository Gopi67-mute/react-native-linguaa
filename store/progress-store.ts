import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

interface ProgressState {
  completedPlanKeys: string[];
  streak: number;
  lastActiveDate: string | null;
  hasHydrated: boolean;
  toggleCompleted: (key: string) => void;
  setHasHydrated: (hasHydrated: boolean) => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedPlanKeys: [],
      streak: 0,
      lastActiveDate: null,
      hasHydrated: false,
      toggleCompleted: (key) => {
        const { completedPlanKeys, lastActiveDate, streak } = get();
        const isCompleting = !completedPlanKeys.includes(key);
        const nextKeys = isCompleting
          ? [...completedPlanKeys, key]
          : completedPlanKeys.filter((existing) => existing !== key);

        const today = todayKey();
        const shouldBumpStreak = isCompleting && lastActiveDate !== today;

        set({
          completedPlanKeys: nextKeys,
          streak: shouldBumpStreak ? streak + 1 : streak,
          lastActiveDate: shouldBumpStreak ? today : lastActiveDate,
        });
      },
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: "progress-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
