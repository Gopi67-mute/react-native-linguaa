import { useState } from "react";
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

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerified = () => {
    setIsVerifying(false);
    router.replace("/");
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

          <View className="mt-6">
            <GradientButton
              label="Sign In"
              onPress={() => setIsVerifying(true)}
              disabled={!email}
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
              onPress={() => {}}
            />
            <SocialButton
              icon="logo-facebook"
              iconColor="#1877F2"
              label="Continue with Facebook"
              onPress={() => {}}
            />
            <SocialButton
              icon="logo-apple"
              iconColor={colors.foreground}
              label="Continue with Apple"
              onPress={() => {}}
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
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  scrollContent: { paddingBottom: 24 },
});
