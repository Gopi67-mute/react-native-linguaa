import { Text, View } from "react-native";
import { Redirect, router } from "expo-router";
import { useAuth, useUser } from "@clerk/expo";

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
      <Text className="text-h1 mb-2 text-primary-deep">You&apos;re signed in ✅</Text>
      <Text className="text-body-lg text-muted-foreground mb-10">
        {user?.primaryEmailAddress?.emailAddress ?? "No email on file"}
      </Text>
      <GradientButton label="Sign Out" onPress={handleSignOut} />
    </View>
  );
}
