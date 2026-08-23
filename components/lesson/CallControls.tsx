import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

import { colors } from "@/theme";

type ControlButtonProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  active?: boolean;
  activeBgClassName?: string;
  iconStyle?: object;
  onPress: () => void;
};

function ControlButton({
  icon,
  label,
  active,
  activeBgClassName = "bg-primary",
  iconStyle,
  onPress,
}: ControlButtonProps) {
  return (
    <View className="items-center" style={{ gap: 6 }}>
      <Pressable
        onPress={onPress}
        className={`w-14 h-14 rounded-full items-center justify-center ${
          active ? activeBgClassName : "bg-surface"
        }`}
      >
        <Ionicons
          name={icon}
          size={22}
          color={active ? "#fff" : colors.foreground}
          style={iconStyle}
        />
      </Pressable>
      <Text className="text-caption text-white">{label}</Text>
    </View>
  );
}

type CallControlsProps = {
  isMuted: boolean;
  onToggleMute: () => void;
  showSubtitles: boolean;
  onToggleSubtitles: () => void;
  isSpeakerOn: boolean;
  onToggleSpeaker: () => void;
  onEndCall: () => void;
};

export function CallControls({
  isMuted,
  onToggleMute,
  showSubtitles,
  onToggleSubtitles,
  isSpeakerOn,
  onToggleSpeaker,
  onEndCall,
}: CallControlsProps) {
  return (
    <View className="flex-row items-center justify-between px-8 py-6">
      <ControlButton
        icon={isMuted ? "mic-off" : "mic"}
        label="Mic"
        active={isMuted}
        activeBgClassName="bg-error"
        onPress={onToggleMute}
      />
      <ControlButton
        icon="text"
        label="Subtitles"
        active={showSubtitles}
        onPress={onToggleSubtitles}
      />
      <ControlButton
        icon={isSpeakerOn ? "volume-high" : "volume-mute"}
        label="Speaker"
        active={isSpeakerOn}
        onPress={onToggleSpeaker}
      />
      <ControlButton
        icon="call"
        label="End Call"
        active
        activeBgClassName="bg-error"
        iconStyle={{ transform: [{ rotate: "135deg" }] }}
        onPress={onEndCall}
      />
    </View>
  );
}
