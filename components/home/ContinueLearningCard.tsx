import { LinearGradient } from "expo-linear-gradient";
import { Image, Pressable, Text, View } from "react-native";

import { images } from "@/constants/images";
import { colors } from "@/theme";

type ContinueLearningCardProps = {
  languageName: string;
  flagEmoji: string;
  unitLabel: string;
  onPress: () => void;
};

export function ContinueLearningCard({
  languageName,
  flagEmoji,
  unitLabel,
  onPress,
}: ContinueLearningCardProps) {
  return (
    <Pressable onPress={onPress} className="rounded-3xl overflow-hidden">
      <LinearGradient
        colors={[colors.primary, colors.primaryDeep]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ padding: 20, minHeight: 172 }}
      >
        <Text className="text-body-md text-white/80">Continue learning</Text>
        <Text className="text-h1 text-white mt-1">
          {languageName} {flagEmoji}
        </Text>
        <Text className="text-body-md text-white/80 mt-1">{unitLabel}</Text>

        <View className="self-start bg-white rounded-full px-6 py-3 mt-4">
          <Text className="text-h4 text-primary-deep">Continue</Text>
        </View>

        <Image
          source={images.palace}
          resizeMode="contain"
          style={{
            position: "absolute",
            right: -8,
            bottom: -8,
            width: 140,
            height: 140,
          }}
        />
      </LinearGradient>
    </Pressable>
  );
}
