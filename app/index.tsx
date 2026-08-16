import { useAuth, useUser } from "@clerk/expo";
import { Redirect, router } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { GradientButton } from "@/components/auth/GradientButton";

export default function Index() {
  const { isLoaded, isSignedIn, signOut } = useAuth();
  const { user } = useUser();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  const handleSignOut = async () => {
    await signOut();
    router.replace("/sign-in");
  };

  return (
    <View className="flex-1 items-center justify-center px-6">
      <Text className="text-h1 mb-2 text-primary-deep">
        You&apos;re signed in as {user?.firstName ?? "User"}!
      </Text>
      <Text className="text-body-lg text--foreground mb-10 text-center">
        {user?.primaryEmailAddress?.emailAddress ?? "No email on file"}
      </Text>
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
    </View>
  );
}
