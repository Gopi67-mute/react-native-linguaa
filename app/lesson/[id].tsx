import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  buildLessonScript,
  getRatingsForPraiseCount,
} from "@/components/lesson/lessonScript";
import { SessionFeedback } from "@/components/lesson/SessionFeedback";
import { TeacherStage } from "@/components/lesson/TeacherStage";
import { getLanguageById } from "@/data/languages";
import { getLessonById } from "@/data/lessons";
import { useProgressStore } from "@/store/progress-store";
import { colors } from "@/theme";
import type { Lesson } from "@/types/learning";

function goToLessons() {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace("/learn");
  }
}

function LessonNotFound() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View className="flex-1 items-center justify-center px-8">
        <Ionicons
          name="alert-circle-outline"
          size={48}
          color={colors.mutedForeground}
        />
        <Text className="text-h3 text-foreground mt-4 text-center">
          Lesson not found
        </Text>
        <Text className="text-body-md text-muted-foreground mt-2 text-center">
          This lesson link is missing or no longer available. Head back to
          Lessons to pick another one.
        </Text>
        <Pressable
          onPress={goToLessons}
          className="bg-primary rounded-full px-8 py-4 mt-8"
        >
          <Text className="text-h4 text-white">Back to Lessons</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function formatTimer(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function AudioLessonSession({ lesson }: { lesson: Lesson }) {
  const language = getLanguageById(lesson.languageId);
  const completedLessonIds = useProgressStore(
    (state) => state.completedLessonIds,
  );
  const completeLesson = useProgressStore((state) => state.completeLesson);
  const isCompleted = completedLessonIds.includes(lesson.id);

  const script = useMemo(() => buildLessonScript(lesson), [lesson]);
  const [stepIndex, setStepIndex] = useState(0);
  const [praiseCount, setPraiseCount] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const step = script[stepIndex];
  const hasFinished = step.kind === "complete";

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (hasFinished && !isCompleted) {
      completeLesson(lesson.id);
    }
  }, [hasFinished, isCompleted, completeLesson, lesson.id]);

  const handleAdvance = () => {
    const nextIndex = Math.min(stepIndex + 1, script.length - 1);
    if (nextIndex === stepIndex) return;
    if (script[nextIndex].kind === "praise") {
      setPraiseCount((count) => count + 1);
    }
    setStepIndex(nextIndex);
  };

  const showFocusAreas = () => {
    Alert.alert(
      "Today's focus",
      lesson.aiTeacher.focusAreas.map((area) => `• ${area}`).join("\n"),
    );
  };

  const ratings = getRatingsForPraiseCount(praiseCount);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View className="flex-1">
        <View className="flex-row items-center px-4 pt-2 pb-1">
          <Pressable
            onPress={goToLessons}
            hitSlop={8}
            className="w-10 h-10 items-center justify-center -ml-1"
          >
            <Ionicons name="chevron-back" size={24} color={colors.foreground} />
          </Pressable>

          <View className="flex-1 ml-1">
            <Text className="text-h3 text-foreground">AI Teacher</Text>
            <View className="flex-row items-center mt-0.5" style={{ gap: 6 }}>
              <View className="w-2 h-2 rounded-full bg-green" />
              <Text className="text-body-sm text-muted-foreground">
                Online
              </Text>
            </View>
          </View>

          <View className="flex-row items-center" style={{ gap: 8 }}>
            <View className="bg-surface rounded-full px-3 py-1.5">
              <Text className="text-body-sm text-foreground">
                {formatTimer(elapsedSeconds)}
              </Text>
            </View>
            <Pressable
              onPress={showFocusAreas}
              hitSlop={8}
              className="w-10 h-10 items-center justify-center"
            >
              <Ionicons
                name="information-circle-outline"
                size={22}
                color={colors.foreground}
              />
            </Pressable>
          </View>
        </View>

        <View className="px-6 pb-3">
          <Text className="text-body-sm text-foreground" numberOfLines={1}>
            {language ? `${language.flagEmoji} ${language.name} • ` : ""}
            {lesson.title}
          </Text>
          <Text
            className="text-caption text-muted-foreground mt-0.5"
            numberOfLines={2}
          >
            {lesson.goal}
          </Text>
        </View>

        <TeacherStage
          step={step}
          showSubtitles={showSubtitles}
          onToggleSubtitles={() => setShowSubtitles((value) => !value)}
          onAdvance={handleAdvance}
          isMuted={isMuted}
          onToggleMute={() => setIsMuted((value) => !value)}
          isSpeakerOn={isSpeakerOn}
          onToggleSpeaker={() => setIsSpeakerOn((value) => !value)}
          onEndCall={goToLessons}
        />

        <SessionFeedback ratings={ratings} />
      </View>
    </SafeAreaView>
  );
}

export default function LessonDetail() {
  const params = useLocalSearchParams<{ id: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const lesson = id ? getLessonById(id) : undefined;

  if (!lesson) {
    return <LessonNotFound />;
  }

  return <AudioLessonSession lesson={lesson} />;
}
