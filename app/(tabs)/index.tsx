import { useAuth, useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, router } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ContinueLearningCard } from "@/components/home/ContinueLearningCard";
import { DailyGoalCard } from "@/components/home/DailyGoalCard";
import { PlanItemRow, type PlanItem } from "@/components/home/PlanItemRow";
import { images } from "@/constants/images";
import { getLanguageById } from "@/data/languages";
import { getLessonsByUnit } from "@/data/lessons";
import { getUnitsByLanguage } from "@/data/units";
import { useLanguageStore } from "@/store/language-store";
import { useProgressStore } from "@/store/progress-store";
import { colors } from "@/theme";
import type { LanguageId } from "@/types/learning";

const GREETINGS: Record<LanguageId, string> = {
  es: "Hola",
  fr: "Salut",
  ja: "こんにちは",
};

export default function Home() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const hasHydrated = useLanguageStore((state) => state.hasHydrated);
  const completedPlanKeys = useProgressStore((state) => state.completedPlanKeys);
  const streak = useProgressStore((state) => state.streak);
  const toggleCompleted = useProgressStore((state) => state.toggleCompleted);

  if (!isLoaded || !hasHydrated) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  if (!selectedLanguage) {
    return <Redirect href="/language-selection" />;
  }

  const language = getLanguageById(selectedLanguage);
  const currentUnit = language
    ? getUnitsByLanguage(language.id)[0]
    : undefined;
  const nextLesson = currentUnit
    ? getLessonsByUnit(currentUnit.id)[0]
    : undefined;

  const planItems: PlanItem[] = nextLesson
    ? [
        {
          id: "lesson",
          icon: "book",
          iconBackground: colors.primary,
          title: "Lesson",
          subtitle: nextLesson.title,
          xp: nextLesson.xpReward,
        },
        {
          id: "conversation",
          icon: "headset",
          iconBackground: colors.primary,
          title: "AI Conversation",
          subtitle: nextLesson.aiTeacher.focusAreas.slice(0, 2).join(" & "),
          xp: 5,
        },
        {
          id: "vocabulary",
          icon: "chatbubble-ellipses",
          iconBackground: colors.error,
          title: "New words",
          subtitle: `${nextLesson.vocabulary.length} words`,
          xp: 5,
        },
      ]
    : [];

  const planKey = (itemId: string) => `${nextLesson?.id}:${itemId}`;
  const goalXp = planItems.reduce((sum, item) => sum + item.xp, 0);
  const completedXp = planItems
    .filter((item) => completedPlanKeys.includes(planKey(item.id)))
    .reduce((sum, item) => sum + item.xp, 0);

  const goToLearn = () => router.push("/learn");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        className="flex-1 px-6"
        contentContainerStyle={{ paddingTop: 8, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3 flex-1">
            <View className="w-11 h-11 rounded-full bg-surface items-center justify-center">
              <Text style={{ fontSize: 20 }}>{language?.flagEmoji}</Text>
            </View>
            <Text className="text-h3 text-foreground" numberOfLines={1}>
              {language ? GREETINGS[language.id] : "Hi"},{" "}
              {user?.firstName ?? "there"}! 👋
            </Text>
          </View>

          <View className="flex-row items-center gap-3">
            <View className="flex-row items-center gap-1">
              <Image
                source={images.streakFire}
                resizeMode="contain"
                style={{ width: 22, height: 22 }}
              />
              <Text className="text-h4 text-foreground">{streak}</Text>
            </View>
            <Ionicons
              name="notifications-outline"
              size={22}
              color={colors.foreground}
            />
          </View>
        </View>

        <View className="mt-6">
          <DailyGoalCard completedXp={completedXp} goalXp={goalXp} />
        </View>

        {language && (
          <View className="mt-4">
            <ContinueLearningCard
              languageName={language.name}
              flagEmoji={language.flagEmoji}
              unitLabel={
                currentUnit
                  ? `Unit ${currentUnit.order} • ${currentUnit.title}`
                  : ""
              }
              onPress={goToLearn}
            />
          </View>
        )}

        {planItems.length > 0 && (
          <View className="mt-8">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-h4 text-foreground">Today&apos;s plan</Text>
              <Pressable onPress={goToLearn} hitSlop={8}>
                <Text className="text-body-md text-primary">View all</Text>
              </Pressable>
            </View>

            {planItems.map((item) => (
              <PlanItemRow
                key={item.id}
                item={item}
                completed={completedPlanKeys.includes(planKey(item.id))}
                onToggle={() => toggleCompleted(planKey(item.id))}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
