import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LessonRow, type LessonStatus } from "@/components/learn/LessonRow";
import { getLessonsByUnit } from "@/data/lessons";
import { getUnitsByLanguage } from "@/data/units";
import { useLanguageStore } from "@/store/language-store";
import { useProgressStore } from "@/store/progress-store";
import { colors } from "@/theme";
import type { Lesson } from "@/types/learning";

type LearnTab = "lessons" | "practice";

export default function Learn() {
  const [activeTab, setActiveTab] = useState<LearnTab>("lessons");
  const [bookmarked, setBookmarked] = useState(false);

  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const completedLessonIds = useProgressStore(
    (state) => state.completedLessonIds,
  );

  if (!selectedLanguage) {
    return null;
  }

  const unit = getUnitsByLanguage(selectedLanguage)[0];
  const lessons = unit ? getLessonsByUnit(unit.id) : [];

  const currentLesson: Lesson | undefined =
    lessons.find((lesson) => !completedLessonIds.includes(lesson.id)) ??
    lessons[lessons.length - 1];

  const getStatus = (lesson: Lesson): LessonStatus => {
    if (completedLessonIds.includes(lesson.id)) return "completed";
    if (currentLesson?.id === lesson.id) return "in-progress";
    return "locked";
  };

  const heroImage = currentLesson?.image ?? unit?.image;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View className="flex-row items-start px-4 pt-2 pb-2">
        <Pressable
          onPress={() =>
            router.canGoBack() ? router.back() : router.push("/")
          }
          hitSlop={8}
          className="w-10 h-10 items-center justify-center -ml-1"
        >
          <Ionicons name="chevron-back" size={24} color={colors.foreground} />
        </Pressable>

        <View className="flex-1 ml-1">
          {currentLesson && unit && (
            <>
              <Text className="text-h3 text-foreground" numberOfLines={1}>
                {currentLesson.title}
              </Text>
              <Text className="text-body-md text-muted-foreground mt-0.5">
                Unit {unit.order} • {currentLesson.order} / {lessons.length}{" "}
                lessons
              </Text>
            </>
          )}
        </View>

        <Pressable
          onPress={() => setBookmarked((prev) => !prev)}
          hitSlop={8}
          className="w-10 h-10 items-center justify-center"
        >
          <Ionicons
            name={bookmarked ? "bookmark" : "bookmark-outline"}
            size={20}
            color={colors.primary}
          />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {heroImage && (
          <View className="bg-surface w-full h-[240px]">
            <Image
              source={{ uri: heroImage }}
              resizeMode="contain"
              className="w-full h-full"
            />
          </View>
        )}

        <View className="px-6 -mt-7">
          <View
            className="flex-row bg-background rounded-full p-1"
            style={styles.shadow}
          >
            <Pressable
              onPress={() => setActiveTab("lessons")}
              className={`flex-1 items-center py-2.5 rounded-full ${
                activeTab === "lessons" ? "bg-surface" : ""
              }`}
            >
              <Text
                className={`text-h4 ${
                  activeTab === "lessons"
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                Lessons
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setActiveTab("practice")}
              className={`flex-1 items-center py-2.5 rounded-full ${
                activeTab === "practice" ? "bg-surface" : ""
              }`}
            >
              <Text
                className={`text-h4 ${
                  activeTab === "practice"
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                Practice
              </Text>
            </Pressable>
          </View>
        </View>

        <View className="px-6 mt-6">
          {activeTab === "lessons" ? (
            lessons.map((lesson) => (
              <LessonRow
                key={lesson.id}
                lesson={lesson}
                status={getStatus(lesson)}
                onPress={() =>
                  router.push({
                    pathname: "/lesson/[id]",
                    params: { id: lesson.id },
                  })
                }
              />
            ))
          ) : (
            <View className="items-center py-16">
              <Text className="text-h4 text-foreground">
                Practice mode is coming soon
              </Text>
              <Text className="text-body-md text-muted-foreground mt-2 text-center">
                Review vocabulary and phrases from lessons you&apos;ve
                completed.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
});
