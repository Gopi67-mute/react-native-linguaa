import { useAuth, useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePostHog } from "posthog-react-native";

import { getLanguageById } from "@/data/languages";
import { useLanguageStore } from "@/store/language-store";
import { colors } from "@/theme";

export default function Profile() {
  const { signOut } = useAuth();
  const { user } = useUser();
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const language = selectedLanguage
    ? getLanguageById(selectedLanguage)
    : undefined;

  const fullName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Learner";
  const email = user?.primaryEmailAddress?.emailAddress ?? "No email on file";
  const initial = fullName.charAt(0).toUpperCase();

  const posthog = usePostHog();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState<string | null>(null);

  const handleSignOut = async () => {
    setSignOutError(null);
    setIsSigningOut(true);
    try {
      posthog.capture('user_signed_out', { language_id: selectedLanguage })
      posthog.reset()
      await signOut();
      router.replace("/sign-in");
    } catch (err) {
      console.error("Sign out error:", err);
      setSignOutError("Something went wrong. Please try again.");
      setIsSigningOut(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View className="flex-1 px-6 pt-4">
        <Text className="text-h2 text-foreground mb-6">Profile</Text>

        <View className="items-center mb-8">
          <View className="w-20 h-20 rounded-full bg-primary items-center justify-center">
            <Text className="text-h1 text-white">{initial}</Text>
          </View>
          <Text className="text-h3 text-foreground mt-3">{fullName}</Text>
          <Text className="text-body-md text-muted-foreground mt-1">
            {email}
          </Text>
        </View>

        <View className="bg-surface rounded-2xl mb-8">
          <Pressable
            onPress={() => router.push("/language-selection")}
            className="flex-row items-center gap-3 px-4 py-4"
          >
            <Ionicons name="globe-outline" size={20} color={colors.primary} />
            <View className="flex-1">
              <Text className="text-h4 text-foreground">
                Learning language
              </Text>
              <Text className="text-body-sm text-muted-foreground mt-0.5">
                {language
                  ? `${language.flagEmoji} ${language.name}`
                  : "Not selected"}
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={colors.mutedForeground}
            />
          </Pressable>
        </View>

        {signOutError && (
          <Text className="text-body-sm text-error mb-2 text-center">
            {signOutError}
          </Text>
        )}

        <Pressable
          onPress={handleSignOut}
          disabled={isSigningOut}
          className="flex-row items-center justify-center gap-2 bg-error/10 rounded-2xl py-4"
          style={isSigningOut ? { opacity: 0.5 } : undefined}
        >
          <Ionicons name="log-out-outline" size={20} color={colors.error} />
          <Text className="text-h4 text-error">
            {isSigningOut ? "Signing Out..." : "Sign Out"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
