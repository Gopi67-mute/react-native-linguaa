import { Image, Text, View } from "react-native";

import { images } from "@/constants/images";

type DailyGoalCardProps = {
  completedXp: number;
  goalXp: number;
};

export function DailyGoalCard({ completedXp, goalXp }: DailyGoalCardProps) {
  const progress = goalXp > 0 ? Math.min(completedXp / goalXp, 1) : 0;

  return (
    <View className="flex-row items-center justify-between bg-[#FDEDE7] rounded-3xl px-5 py-4">
      <View className="flex-1">
        <Text className="text-body-md text-foreground">Daily goal</Text>
        <Text className="text-h1 text-foreground mt-1">
          {completedXp}
          <Text className="text-h4 text-muted-foreground"> / {goalXp} XP</Text>
        </Text>
        <View className="h-2 bg-[#F6D9C4] rounded-full mt-3 overflow-hidden">
          <View
            className="h-2 bg-streak rounded-full"
            style={{ width: `${progress * 100}%` }}
          />
        </View>
      </View>
      <Image
        source={images.treasure}
        resizeMode="contain"
        style={{ width: 72, height: 72, marginLeft: 12 }}
      />
    </View>
  );
}
