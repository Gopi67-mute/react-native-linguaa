import { Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type IoniconName = keyof typeof Ionicons.glyphMap;

type SocialButtonProps = {
  icon: IoniconName;
  iconColor: string;
  label: string;
  onPress: () => void;
};

export function SocialButton({
  icon,
  iconColor,
  label,
  onPress,
}: SocialButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-center gap-3 border border-border rounded-2xl py-4 active:bg-surface"
    >
      <Ionicons name={icon} size={20} color={iconColor} />
      <Text className="text-h4 text-foreground">{label}</Text>
    </Pressable>
  );
}
