import { useAuth, useUser } from "@clerk/expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, router } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { GradientButton } from "@/components/auth/GradientButton";
import { getLanguageById } from "@/data/languages";
import { useLanguageStore } from "@/store/language-store";

export default function Home() {
  const { isLoaded, isSignedIn, signOut } = useAuth();
  const { user } = useUser();
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const hasHydrated = useLanguageStore((state) => state.hasHydrated);

  if (!isLoaded || !hasHydrated) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  if (!selectedLanguage) {
    return <Redirect href="/language-selection" />;
  }

  const language = getLanguageById(selectedLanguage);

  const handleSignOut = async () => {
    await signOut();
    router.replace("/sign-in");
  };

  const handleClearStorage = async () => {
    await AsyncStorage.clear();
    useLanguageStore.setState({ selectedLanguage: null });
  };

  return (
    <View className="flex-1 items-center justify-center px-6">
      <Text className="text-h1 mb-2 text-primary-deep">
        You&apos;re signed in as {user?.firstName ?? "User"}!
      </Text>
      <Text className="text-body-lg text-foreground mb-4 text-center">
        {user?.primaryEmailAddress?.emailAddress ?? "No email on file"}
      </Text>
      {language && (
        <Text className="text-body-md text-blue-500 mb-6 text-center font-semibold">
          Learning {language.flagEmoji} {language.name}
        </Text>
      )}
      <GradientButton label="Sign Out" onPress={handleSignOut} />

      <Pressable
        onPress={() => router.push("/language-selection")}
        className="mt-6"
        hitSlop={8}
      >
        <Text className="text-body-md text-black bg-yellow-500 rounded-2xl px-4 py-2">
          Choose a language
        </Text>
      </Pressable>

      <Pressable onPress={handleClearStorage} className="mt-4" hitSlop={8}>
        <Text className="text-body-md text-white bg-error rounded-2xl px-4 py-2">
          Clear AsyncStorage (test)
        </Text>
      </Pressable>
    </View>
  );
}
