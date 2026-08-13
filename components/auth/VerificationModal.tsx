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
import { Ionicons } from "@expo/vector-icons";

import { colors } from "@/theme";

const CODE_LENGTH = 6;

type VerificationModalProps = {
  visible: boolean;
  email: string;
  onClose: () => void;
  onVerified: () => void;
};

export function VerificationModal({
  visible,
  email,
  onClose,
  onVerified,
}: VerificationModalProps) {
  const [code, setCode] = useState("");
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (!visible) return;

    setCode("");
    const focusTimeout = setTimeout(() => inputRef.current?.focus(), 300);
    return () => clearTimeout(focusTimeout);
  }, [visible]);

  const handleChangeText = (text: string) => {
    const digitsOnly = text.replace(/[^0-9]/g, "").slice(0, CODE_LENGTH);
    setCode(digitsOnly);

    if (digitsOnly.length === CODE_LENGTH) {
      onVerified();
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
              <Pressable onPress={onClose} hitSlop={8}>
                <Ionicons name="close" size={24} color={colors.mutedForeground} />
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
                      isActive ? "border-primary" : "border-border"
                    }`}
                  >
                    <Text className="text-h2 text-foreground">{digit ?? ""}</Text>
                  </View>
                );
              })}
            </Pressable>

            <TextInput
              ref={inputRef}
              value={code}
              onChangeText={handleChangeText}
              keyboardType="number-pad"
              maxLength={CODE_LENGTH}
              style={{ position: "absolute", opacity: 0, height: 1, width: 1 }}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}
