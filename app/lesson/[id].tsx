import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/expo";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CallingState,
  StreamCall,
  useCallStateHooks,
} from "@stream-io/video-react-native-sdk";

import {
  buildLessonScript,
  getRatingsForPraiseCount,
  type ScriptStep,
  type SessionRatings,
} from "@/components/lesson/lessonScript";
import { SessionFeedback } from "@/components/lesson/SessionFeedback";
import { TeacherStage } from "@/components/lesson/TeacherStage";
import { getLanguageById } from "@/data/languages";
import { getLessonById } from "@/data/lessons";
import { useCallAudioControls } from "@/hooks/useCallAudioControls";
import { useLessonCall } from "@/hooks/useLessonCall";
import {
  type AgentConnectionStatus,
  useVisionAgentSession,
} from "@/hooks/useVisionAgentSession";
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

function CallStatusScreen({
  icon,
  showSpinner,
  title,
  message,
  actionLabel,
  onAction,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  showSpinner?: boolean;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View className="flex-1 items-center justify-center px-8">
        {showSpinner ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <Ionicons name={icon} size={48} color={colors.mutedForeground} />
        )}
        <Text className="text-h3 text-foreground mt-4 text-center">
          {title}
        </Text>
        <Text className="text-body-md text-muted-foreground mt-2 text-center">
          {message}
        </Text>
        {actionLabel && onAction && (
          <Pressable
            onPress={onAction}
            className="bg-primary rounded-full px-8 py-4 mt-8"
          >
            <Text className="text-h4 text-white">{actionLabel}</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

function formatTimer(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function getCallStatus(
  callingState: CallingState,
  isMuted: boolean,
  agentStatus: AgentConnectionStatus,
) {
  switch (callingState) {
    case CallingState.JOINING:
      return { label: "Connecting…", dotClassName: "bg-muted-foreground" };
    case CallingState.RECONNECTING:
      return { label: "Reconnecting…", dotClassName: "bg-muted-foreground" };
    case CallingState.OFFLINE:
    case CallingState.RECONNECTING_FAILED:
      return { label: "Connection lost", dotClassName: "bg-error" };
    case CallingState.LEFT:
      return { label: "Call ended", dotClassName: "bg-muted-foreground" };
    case CallingState.JOINED:
    default:
      if (agentStatus === "idle" || agentStatus === "connecting") {
        return {
          label: "Connecting AI teacher…",
          dotClassName: "bg-muted-foreground",
        };
      }
      if (agentStatus === "failed") {
        return { label: "AI teacher unavailable", dotClassName: "bg-error" };
      }
      return isMuted
        ? { label: "Muted", dotClassName: "bg-error" }
        : { label: "Live", dotClassName: "bg-green" };
  }
}

type AudioLessonBodyProps = {
  lesson: Lesson;
  languageLabel: string;
  step: ScriptStep;
  showSubtitles: boolean;
  onToggleSubtitles: () => void;
  onAdvance: () => void;
  onEndCall: () => void;
  onShowFocusAreas: () => void;
  elapsedSeconds: number;
  ratings: SessionRatings | null;
  userName?: string;
  userImage?: string;
};

// Rendered inside <StreamCall> — useCallStateHooks() reads the active call
// from that context, so mic/call state here is the real Stream call state.
function AudioLessonBody({
  lesson,
  languageLabel,
  step,
  showSubtitles,
  onToggleSubtitles,
  onAdvance,
  onEndCall,
  onShowFocusAreas,
  elapsedSeconds,
  ratings,
  userName,
  userImage,
}: AudioLessonBodyProps) {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const { isMuted, toggleMute, isSpeakerOn, toggleSpeaker } =
    useCallAudioControls();
  const agentStatus = useVisionAgentSession(lesson.id, lesson.languageId);
  const { label, dotClassName } = getCallStatus(
    callingState,
    isMuted,
    agentStatus,
  );
  const userInitial = userName?.trim()?.[0]?.toUpperCase() ?? "?";

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
            <View className="flex-row items-center mt-0.5 gap-1.5">
              <View className={`w-2 h-2 rounded-full ${dotClassName}`} />
              <Text className="text-body-sm text-muted-foreground">
                {label}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center gap-2">
            {userImage ? (
              <Image
                source={{ uri: userImage }}
                accessibilityLabel={userName ? `Signed in as ${userName}` : "Your profile picture"}
                className="w-7 h-7 rounded-full"
              />
            ) : (
              <View className="w-7 h-7 rounded-full bg-primary items-center justify-center">
                <Text className="text-caption text-white">{userInitial}</Text>
              </View>
            )}
            <View className="bg-surface rounded-full px-3 py-1.5">
              <Text className="text-body-sm text-foreground">
                {formatTimer(elapsedSeconds)}
              </Text>
            </View>
            <Pressable
              onPress={onShowFocusAreas}
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
            {languageLabel}
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
          onToggleSubtitles={onToggleSubtitles}
          onAdvance={onAdvance}
          isMuted={isMuted}
          onToggleMute={toggleMute}
          isSpeakerOn={isSpeakerOn}
          onToggleSpeaker={toggleSpeaker}
          onEndCall={onEndCall}
        />

        <SessionFeedback ratings={ratings} />
      </View>
    </SafeAreaView>
  );
}

function AudioLessonSession({ lesson }: { lesson: Lesson }) {
  const language = getLanguageById(lesson.languageId);
  const languageLabel = language ? `${language.flagEmoji} ${language.name} • ` : "";
  const completedLessonIds = useProgressStore(
    (state) => state.completedLessonIds,
  );
  const completeLesson = useProgressStore((state) => state.completeLesson);
  const isCompleted = completedLessonIds.includes(lesson.id);
  const { user } = useUser();

  const script = useMemo(() => buildLessonScript(lesson), [lesson]);
  const [stepIndex, setStepIndex] = useState(0);
  const [praiseCount, setPraiseCount] = useState(0);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const { call, phase, errorMessage, endCall } = useLessonCall(lesson.id);

  const step = script[stepIndex];
  const hasFinished = step.kind === "complete";

  useEffect(() => {
    if (phase !== "joined") return;
    const interval = setInterval(() => {
      setElapsedSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [phase]);

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

  const handleEndCall = () => {
    endCall();
  };

  const ratings = getRatingsForPraiseCount(praiseCount);

  if (phase === "connecting" || !call) {
    return (
      <CallStatusScreen
        icon="call-outline"
        showSpinner
        title="Connecting…"
        message="Setting up your audio lesson with your AI teacher."
      />
    );
  }

  if (phase === "error") {
    return (
      <CallStatusScreen
        icon="alert-circle-outline"
        title="Couldn't connect"
        message={errorMessage ?? "Something went wrong starting the call."}
        actionLabel="Back to Lessons"
        onAction={goToLessons}
      />
    );
  }

  if (phase === "ended") {
    return (
      <CallStatusScreen
        icon="checkmark-circle-outline"
        title="Lesson ended"
        message="Nice work today! Head back to keep your streak going."
        actionLabel="Back to Lessons"
        onAction={goToLessons}
      />
    );
  }

  return (
    <StreamCall call={call}>
      <AudioLessonBody
        lesson={lesson}
        languageLabel={languageLabel}
        step={step}
        showSubtitles={showSubtitles}
        onToggleSubtitles={() => setShowSubtitles((value) => !value)}
        onAdvance={handleAdvance}
        onEndCall={handleEndCall}
        onShowFocusAreas={showFocusAreas}
        elapsedSeconds={elapsedSeconds}
        ratings={ratings}
        userName={user?.firstName ?? user?.fullName ?? undefined}
        userImage={user?.imageUrl}
      />
    </StreamCall>
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
