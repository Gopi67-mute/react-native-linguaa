import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";

import { colors } from "@/theme";
import type { Lesson } from "@/types/learning";

export type LessonStatus = "completed" | "in-progress" | "locked";

type LessonRowProps = {
  lesson: Lesson;
  status: LessonStatus;
  onPress: () => void;
};

export function LessonRow({ lesson, status, onPress }: LessonRowProps) {
  const isCompleted = status === "completed";
  const isCurrent = status === "in-progress";
  const isLocked = status === "locked";

  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center justify-between rounded-2xl border px-4 py-4 mb-3 ${
        isCurrent ? "border-primary bg-[#F5F3FF]" : "border-border bg-background"
      }`}
    >
      <View className="flex-1 pr-3">
        <Text
          className={`text-body-sm ${isCurrent ? "text-primary" : "text-muted-foreground"}`}
        >
          Lesson {lesson.order}
        </Text>
        <Text
          className={`text-h4 mt-0.5 ${
            isCurrent
              ? "text-primary"
              : isLocked
                ? "text-muted-foreground"
                : "text-foreground"
          }`}
        >
          {lesson.title}
        </Text>
        {isCurrent && (
          <Text className="text-body-sm text-primary mt-0.5">In progress</Text>
        )}
        {isLocked && (
          <Text className="text-body-sm text-muted-foreground mt-0.5">
            0 / {lesson.activities.length} activities
          </Text>
        )}
      </View>

      {isCompleted && (
        <View className="w-7 h-7 rounded-full bg-green items-center justify-center">
          <Ionicons name="checkmark" size={16} color="#fff" />
        </View>
      )}
      {isCurrent && lesson.image && (
        <Image
          source={{ uri: lesson.image }}
          resizeMode="cover"
          className="w-12 h-12 rounded-xl"
        />
      )}
      {isLocked && (
        <Ionicons name="lock-closed" size={18} color={colors.mutedForeground} />
      )}
    </Pressable>
  );
}
