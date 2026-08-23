import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import { colors } from "@/theme";

const CODE_LENGTH = 6;

function getVerificationErrorMessage(error: unknown) {
  if (error && typeof error === "object") {
    const authError = error as { longMessage?: unknown; message?: unknown };
    if (typeof authError.longMessage === "string") {
      return authError.longMessage;
    }
    if (typeof authError.message === "string") {
      return authError.message;
    }
  }

  return "The verification code is invalid or has expired. Please try again.";
}

type VerificationModalProps = {
  visible: boolean;
  email: string;
  onClose: () => void;
  onVerified: () => void;
  onVerify: (code: string) => Promise<string | null>;
};

export function VerificationModal({
  visible,
  email,
  onClose,
  onVerified,
  onVerify,
}: VerificationModalProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (!visible) return;

    setCode("");
    setError(null);
    setIsChecking(false);
    const focusTimeout = setTimeout(() => inputRef.current?.focus(), 300);
    return () => clearTimeout(focusTimeout);
  }, [visible]);

  const handleChangeText = async (text: string) => {
    const digitsOnly = text.replace(/[^0-9]/g, "").slice(0, CODE_LENGTH);
    setCode(digitsOnly);
    setError(null);

    if (digitsOnly.length === CODE_LENGTH) {
      setIsChecking(true);
      try {
        const errorMessage = await onVerify(digitsOnly);

        if (errorMessage) {
          setError(errorMessage);
          setCode("");
        } else {
          onVerified();
        }
      } catch (verificationError) {
        setError(getVerificationErrorMessage(verificationError));
        setCode("");
      } finally {
        setIsChecking(false);
      }
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/40">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View className="bg-background rounded-t-3xl px-6 pt-6 pb-10">
            <View className="flex-row items-start justify-between mb-4">
              <Text className="text-h2 text-foreground flex-1 pr-4">
                Verify your email
              </Text>
              <Pressable
                onPress={onClose}
                accessibilityRole="button"
                accessibilityLabel="Close verification modal"
                hitSlop={8}
              >
                <Ionicons
                  name="close"
                  size={24}
                  color={colors.mutedForeground}
                />
              </Pressable>
            </View>

            <Text className="text-body-md text-muted-foreground mb-6">
              We&apos;ve sent a 6-digit code to{" "}
              <Text className="text-foreground">{email || "your email"}</Text>.
              Enter it below to continue.
            </Text>

            <Pressable
              onPress={() => inputRef.current?.focus()}
              className="flex-row justify-between mb-2"
            >
              {Array.from({ length: CODE_LENGTH }).map((_, index) => {
                const digit = code[index];
                const isActive = index === code.length;

                return (
                  <View
                    key={index}
                    className={`w-12 h-14 rounded-2xl border items-center justify-center ${
                      error
                        ? "border-error"
                        : isActive
                          ? "border-primary"
                          : "border-border"
                    }`}
                  >
                    <Text className="text-h2 text-foreground">
                      {digit ?? ""}
                    </Text>
                  </View>
                );
              })}
            </Pressable>

            {error && (
              <Text className="text-body-sm text-error mt-2">{error}</Text>
            )}

            <TextInput
              ref={inputRef}
              value={code}
              onChangeText={handleChangeText}
              accessibilityLabel="6-digit verification code"
              accessibilityHint="Enter the verification code sent to your email"
              keyboardType="number-pad"
              maxLength={CODE_LENGTH}
              editable={!isChecking}
              style={{ position: "absolute", opacity: 0, height: 1, width: 1 }}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}
