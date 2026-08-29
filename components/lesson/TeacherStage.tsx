import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { images } from "@/constants/images";
import { colors } from "@/theme";

import { CallControls } from "./CallControls";
import type { ScriptStep } from "./lessonScript";

// Library scene stands in for a real teacher backdrop until a scene-specific
// illustration is added to assets/images (see AGENTS.md image rules).
const STAGE_BACKGROUND_URI =
  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=80";

type TeacherStageProps = {
  step: ScriptStep;
  showSubtitles: boolean;
  onToggleSubtitles: () => void;
  onAdvance: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isSpeakerOn: boolean;
  onToggleSpeaker: () => void;
  onEndCall: () => void;
};

export function TeacherStage({
  step,
  showSubtitles,
  onToggleSubtitles,
  onAdvance,
  isMuted,
  onToggleMute,
  isSpeakerOn,
  onToggleSpeaker,
  onEndCall,
}: TeacherStageProps) {
  const isFinalStep = step.kind === "complete";

  return (
    <View className="flex-1">
      <Image
        source={{ uri: STAGE_BACKGROUND_URI }}
        resizeMode="cover"
        className="absolute inset-0"
      />
      <View className="absolute inset-0 bg-[rgba(13,19,43,0.35)]" />

      <View className="flex-1 items-center justify-center px-6">
        <Image
          source={images.mascotWelcome}
          resizeMode="contain"
          className="w-[12.5px] h-[12.5px]"
        />
      </View>

      <View className="px-4">
        <View
          className="bg-background rounded-2xl px-4 py-3 flex-row items-start gap-3"
          style={styles.bubbleShadow}
        >
          <View className="flex-1">
            <Text className="text-h4 text-foreground">{step.line}</Text>
            {showSubtitles && step.caption && (
              <Text className="text-body-sm text-muted-foreground mt-1">
                {step.caption}
              </Text>
            )}
          </View>

          {!isFinalStep && (
            <Pressable
              onPress={onAdvance}
              hitSlop={8}
              className="w-9 h-9 rounded-full bg-surface items-center justify-center"
              accessibilityLabel="Play teacher line and continue"
            >
              <Ionicons name="volume-high" size={18} color={colors.primary} />
            </Pressable>
          )}
        </View>
      </View>

      <CallControls
        isMuted={isMuted}
        onToggleMute={onToggleMute}
        showSubtitles={showSubtitles}
        onToggleSubtitles={onToggleSubtitles}
        isSpeakerOn={isSpeakerOn}
        onToggleSpeaker={onToggleSpeaker}
        onEndCall={onEndCall}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bubbleShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
});
