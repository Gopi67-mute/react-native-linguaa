import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

import { colors } from "@/theme";
import type { Language } from "@/types/learning";

type LanguageCardProps = {
  language: Language;
  selected: boolean;
  onPress: () => void;
};

export function LanguageCard({ language, selected, onPress }: LanguageCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center justify-between rounded-2xl border px-4 py-3 mb-3 ${
        selected ? "border-primary bg-[#F5F3FF]" : "border-border bg-background"
      }`}
    >
      <View className="flex-row items-center gap-3">
        <View className="w-12 h-12 rounded-full bg-surface items-center justify-center">
          <Text className="text-h3">{language.flagEmoji}</Text>
        </View>
        <View>
          <Text className="text-h4 text-foreground">{language.name}</Text>
          <Text className="text-body-sm text-muted-foreground">
            {language.learners}
          </Text>
        </View>
      </View>

      {selected ? (
        <View className="w-6 h-6 rounded-full bg-primary-deep items-center justify-center">
          <Ionicons name="checkmark" size={16} color={colors.background} />
        </View>
      ) : (
        <Ionicons name="chevron-forward" size={20} color={colors.mutedForeground} />
      )}
    </Pressable>
  );
}
