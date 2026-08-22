import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

import { colors } from "@/theme";

type IconName = keyof typeof Ionicons.glyphMap;

export type PlanItem = {
  id: string;
  icon: IconName;
  iconBackground: string;
  title: string;
  subtitle: string;
  xp: number;
};

type PlanItemRowProps = {
  item: PlanItem;
  completed: boolean;
  onToggle: () => void;
};

export function PlanItemRow({ item, completed, onToggle }: PlanItemRowProps) {
  return (
    <View className="flex-row items-center gap-3 py-2">
      <View
        className="w-11 h-11 rounded-2xl items-center justify-center"
        style={{ backgroundColor: item.iconBackground }}
      >
        <Ionicons name={item.icon} size={20} color="#fff" />
      </View>

      <View className="flex-1">
        <Text className="text-h4 text-foreground">{item.title}</Text>
        <Text className="text-body-sm text-muted-foreground mt-0.5">
          {item.subtitle}
        </Text>
      </View>

      <Pressable
        onPress={onToggle}
        hitSlop={8}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: completed }}
        accessibilityLabel={`${item.title}, ${completed ? "completed" : "incomplete"}`}
        className="w-7 h-7 rounded-full items-center justify-center"
        style={
          completed
            ? { backgroundColor: colors.primary }
            : { borderWidth: 2, borderColor: colors.border }
        }
      >
        {completed && <Ionicons name="checkmark" size={16} color="#fff" />}
      </Pressable>
    </View>
  );
}
