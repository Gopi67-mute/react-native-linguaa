import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

// Mock starting progress so the Learn screen isn't empty on first launch —
// pretends the user already finished each language's first two lessons.
const DEFAULT_COMPLETED_LESSON_IDS = [
  "es-u1-l1",
  "es-u1-l2",
  "fr-u1-l1",
  "fr-u1-l2",
  "ja-u1-l1",
  "ja-u1-l2",
];

interface ProgressState {
  completedPlanKeys: string[];
  completedLessonIds: string[];
  streak: number;
  lastActiveDate: string | null;
  hasHydrated: boolean;
  toggleCompleted: (key: string) => void;
  completeLesson: (lessonId: string) => void;
  setHasHydrated: (hasHydrated: boolean) => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedPlanKeys: [],
      completedLessonIds: DEFAULT_COMPLETED_LESSON_IDS,
      streak: 0,
      lastActiveDate: null,
      hasHydrated: false,
      completeLesson: (lessonId) => {
        const { completedLessonIds } = get();
        if (completedLessonIds.includes(lessonId)) return;
        set({ completedLessonIds: [...completedLessonIds, lessonId] });
      },
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
