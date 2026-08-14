import { useState } from "react";
import { useSignUp } from "@clerk/expo";
import { useSSO } from "@clerk/expo/experimental";
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

export default function SignUp() {
  const { signUp } = useSignUp();
  const { startSSOFlow } = useSSO();

  const [email, setEmail] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSignUp = async () => {
    setFormError(null);
    setIsSubmitting(true);

    const { error } = await signUp.create({ emailAddress: email });
    if (error) {
      setFormError(error.longMessage ?? error.message);
      setIsSubmitting(false);
      return;
    }

    const { error: sendError } = await signUp.verifications.sendEmailCode();
    setIsSubmitting(false);
    if (sendError) {
      setFormError(sendError.longMessage ?? sendError.message);
      return;
    }

    setIsVerifying(true);
  };

  const handleVerify = async (code: string) => {
    const { error } = await signUp.verifications.verifyEmailCode({ code });
    if (error) {
      return error.longMessage ?? error.message;
    }

    console.log("[sign-up] status after verifyEmailCode:", signUp.status);
    console.log("[sign-up] requiredFields:", signUp.requiredFields);
    console.log("[sign-up] missingFields:", signUp.missingFields);
    console.log("[sign-up] unverifiedFields:", signUp.unverifiedFields);

    if (signUp.status !== "complete") {
      if (signUp.missingFields.length > 0) {
        return `Sign-up is missing required fields: ${signUp.missingFields.join(", ")}.`;
      }
      if (signUp.unverifiedFields.length > 0) {
        return `Still need to verify: ${signUp.unverifiedFields.join(", ")}.`;
      }
      return `Sign-up isn't complete yet (status: ${signUp.status}).`;
    }

    const { error: finalizeError } = await signUp.finalize();
    if (finalizeError) {
      return finalizeError.longMessage ?? finalizeError.message;
    }

    return null;
  };

  const handleVerified = () => {
    setIsVerifying(false);
    router.replace("/");
  };

  const handleSocialAuth = async (strategy: OAuthStrategy) => {
    setFormError(null);
    try {
      const { createdSessionId } = await startSSOFlow({ strategy });
      if (createdSessionId) {
        router.replace("/");
      }
    } catch (err) {
      console.error("Social sign-up error:", err);
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

          <Text className="text-h1 text-foreground mt-4">
            Create your account
          </Text>
          <Text className="text-body-lg text-muted-foreground mt-2">
            Start your language journey today ✨
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
              label="Sign Up"
              onPress={handleSignUp}
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
              Already have an account?{" "}
            </Text>
            <Pressable onPress={() => router.replace("/sign-in")} hitSlop={8}>
              <Text
                className="text-body-md text-primary-deep"
                style={{ fontFamily: fontFamily.semibold }}
              >
                Log in
              </Text>
            </Pressable>
          </View>

          {/* Required for sign-up flows on Expo web. Clerk skips the browser CAPTCHA on iOS and Android */}
          <View nativeID="clerk-captcha" />
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
