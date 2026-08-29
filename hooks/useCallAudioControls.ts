import { useEffect, useState } from "react";
import {
  callManager,
  useCallStateHooks,
} from "@stream-io/video-react-native-sdk";

/**
 * Mute and speaker controls for the active call. Must be used inside
 * <StreamCall> — useCallStateHooks() reads the call from that context.
 * Speaker state has no reactive hook on React Native (Stream Video docs),
 * so it's tracked locally and pushed to the native call manager directly.
 */
export function useCallAudioControls() {
  const { useMicrophoneState } = useCallStateHooks();
  const { microphone, isMute } = useMicrophoneState();
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);

  useEffect(() => {
    callManager.speaker.setForceSpeakerphoneOn(true);
  }, []);

  const toggleMute = () => {
    microphone.toggle().catch((err) => console.error("Failed to toggle microphone", err));
  };

  const toggleSpeaker = () => {
    const next = !isSpeakerOn;
    callManager.speaker.setForceSpeakerphoneOn(next);
    setIsSpeakerOn(next);
  };

  return { isMuted: isMute, toggleMute, isSpeakerOn, toggleSpeaker };
}
