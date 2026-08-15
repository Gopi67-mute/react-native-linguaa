import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "@/theme";

type AuthTextFieldProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureEntry?: boolean;
  keyboardType?: "default" | "email-address";
};

export function AuthTextField({
  label,
  value,
  onChangeText,
  placeholder,
  secureEntry = false,
  keyboardType = "default",
}: AuthTextFieldProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <View className="flex-row items-center border border-border rounded-2xl px-4 py-2">
      <View className="flex-1">
        <Text className="text-caption text-muted-foreground mb-1">{label}</Text>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.mutedForeground}
          secureTextEntry={secureEntry && !isRevealed}
          keyboardType={keyboardType}
          autoCapitalize="none"
          autoCorrect={false}
          className="text-body-lg text-foreground p-0"
        />
      </View>

      {secureEntry && (
        <Pressable
          onPress={() => setIsRevealed((prev) => !prev)}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={isRevealed ? "Hide password" : "Show password"}
          accessibilityState={{ selected: isRevealed }}
        >
          <Ionicons
            name={isRevealed ? "eye-off-outline" : "eye-outline"}
            size={20}
            color={colors.mutedForeground}
          />
        </Pressable>
      )}
    </View>
  );
}
