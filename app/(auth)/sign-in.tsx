import { useState } from "react";
import { useSignIn } from "@clerk/expo";
import { useSSO } from "@clerk/expo/experimental";
import { usePostHog } from "posthog-react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthMascot } from "@/components/auth/AuthMascot";
import { AuthTextField } from "@/components/auth/AuthTextField";
import { GradientButton } from "@/components/auth/GradientButton";
import { SocialButton } from "@/components/auth/SocialButton";
import { VerificationModal } from "@/components/auth/VerificationModal";
import { colors, fontFamily } from "@/theme";

type OAuthStrategy = "oauth_google" | "oauth_facebook" | "oauth_apple";

export default function SignIn() {
  const { signIn } = useSignIn();
  const { startSSOFlow } = useSSO();
  const posthog = usePostHog();

  const [email, setEmail] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSignIn = async () => {
    setFormError(null);
    setIsSubmitting(true);

    const { error } = await signIn.emailCode.sendCode({ emailAddress: email });
    setIsSubmitting(false);
    if (error) {
      setFormError(error.longMessage ?? error.message);
      return;
    }

    setIsVerifying(true);
  };

  const handleVerify = async (code: string) => {
    const { error } = await signIn.emailCode.verifyCode({ code });
    if (error) {
      return error.longMessage ?? error.message;
    }

    if (signIn.status !== "complete") {
      return "Something went wrong. Please try again.";
    }

    const { error: finalizeError } = await signIn.finalize();
    if (finalizeError) {
      return finalizeError.longMessage ?? finalizeError.message;
    }

    return null;
  };

  const handleVerified = () => {
    // AuthObserver in _layout.tsx identifies the user by Clerk ID once the session is active
    posthog.capture('user_signed_in', { auth_method: 'email' })
    setIsVerifying(false);
    router.replace("/");
  };

  const handleSocialAuth = async (strategy: OAuthStrategy) => {
    setFormError(null);
    try {
      const { createdSessionId } = await startSSOFlow({ strategy });
      if (createdSessionId) {
        // AuthObserver in _layout.tsx identifies the user by Clerk ID once the session is active
        posthog.capture('social_signin_completed', {
          auth_method: strategy.replace('oauth_', ''),
        })
        router.replace("/");
      }
    } catch (err) {
      console.error("Social sign-in error:", err);
      setFormError("Something went wrong. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          className="flex-1 px-6"
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 items-start justify-center -ml-2 mt-2"
            hitSlop={8}
          >
            <Ionicons name="chevron-back" size={26} color={colors.foreground} />
          </Pressable>

          <Text className="text-h1 text-foreground mt-4">Welcome back</Text>
          <Text className="text-body-lg text-muted-foreground mt-2">
            Continue your language journey ✨
          </Text>

          <AuthMascot />

          <View className="gap-4">
            <AuthTextField
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="alex@gmail.com"
              keyboardType="email-address"
            />
          </View>

          {formError && (
            <Text className="text-body-sm text-error mt-3">{formError}</Text>
          )}

          <View className="mt-6">
            <GradientButton
              label="Sign In"
              onPress={handleSignIn}
              disabled={!email || isSubmitting}
            />
          </View>

          <View className="flex-row items-center gap-3 my-6">
            <View className="flex-1 h-px bg-border" />
            <Text className="text-body-sm text-muted-foreground">
              or continue with
            </Text>
            <View className="flex-1 h-px bg-border" />
          </View>

          <View className="gap-3">
            <SocialButton
              icon="logo-google"
              iconColor="#4285F4"
              label="Continue with Google"
              onPress={() => handleSocialAuth("oauth_google")}
            />
            <SocialButton
              icon="logo-facebook"
              iconColor="#1877F2"
              label="Continue with Facebook"
              onPress={() => handleSocialAuth("oauth_facebook")}
            />
            <SocialButton
              icon="logo-apple"
              iconColor={colors.foreground}
              label="Continue with Apple"
              onPress={() => handleSocialAuth("oauth_apple")}
            />
          </View>

          <View className="flex-row items-center justify-center mt-8">
            <Text className="text-body-md text-muted-foreground">
              Don&apos;t have an account?{" "}
            </Text>
            <Pressable onPress={() => router.replace("/sign-up")} hitSlop={8}>
              <Text
                className="text-body-md text-primary-deep"
                style={{ fontFamily: fontFamily.semibold }}
              >
                Sign up
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <VerificationModal
        visible={isVerifying}
        email={email}
        onClose={() => setIsVerifying(false)}
        onVerified={handleVerified}
        onVerify={handleVerify}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  scrollContent: { paddingBottom: 24 },
});
