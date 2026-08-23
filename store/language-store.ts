import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { LanguageId } from "@/types/learning";

interface LanguageState {
  selectedLanguage: LanguageId | null;
  hasHydrated: boolean;
  setSelectedLanguage: (language: LanguageId) => void;
  resetSelectedLanguage: () => Promise<void>;
  setHasHydrated: (hasHydrated: boolean) => void;
}
//instance of the store create zustand
export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      selectedLanguage: null,
      hasHydrated: false,
      setSelectedLanguage: (language) => set({ selectedLanguage: language }),
      resetSelectedLanguage: async () => {
        set({ selectedLanguage: null });
        await AsyncStorage.removeItem("language-storage");
      },
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: "language-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
