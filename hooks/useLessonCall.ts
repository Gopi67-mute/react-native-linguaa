import { useEffect, useState } from "react";
import { useAuth } from "@clerk/expo";
import {
  Call,
  CallingState,
  useStreamVideoClient,
} from "@stream-io/video-react-native-sdk";

import { createLessonCall } from "@/lib/stream-client";

export type LessonCallPhase = "connecting" | "joined" | "error" | "ended";

/**
 * Creates (server-side) and joins the audio-only Stream call for a lesson,
 * then owns that Call instance for the screen's lifetime. See
 * app/api/stream/call+api.ts for how the call and its members are created.
 */
export function useLessonCall(lessonId: string) {
  const client = useStreamVideoClient();
  const { getToken } = useAuth();
  const [call, setCall] = useState<Call>();
  const [phase, setPhase] = useState<LessonCallPhase>("connecting");
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    if (!client) return;

    let cancelled = false;
    let joinedCall: Call | undefined;

    setCall(undefined);
    setPhase("connecting");
    setErrorMessage(undefined);

    (async () => {
      const session = await createLessonCall(getToken, lessonId);
      if (cancelled) return;

      const c = client.call(session.callType, session.callId, {
        reuseInstance: true,
      });
      joinedCall = c;

      await c.join();
      if (cancelled) return;

      try {
        await c.microphone.enable();
      } catch (err) {
        console.error("Failed to enable microphone", err);
      }

      if (cancelled) return;
      setCall(c);
      setPhase("joined");
    })().catch((err) => {
      console.error("Failed to join lesson call", err);
      if (!cancelled) {
        setErrorMessage(
          err instanceof Error ? err.message : "Could not connect to the lesson call.",
        );
        setPhase("error");
      }
    });

    return () => {
      cancelled = true;
      if (joinedCall && joinedCall.state.callingState !== CallingState.LEFT) {
        joinedCall.leave().catch((err) => console.error(err));
      }
      setCall(undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, lessonId]);

  const endCall = async () => {
    if (call && call.state.callingState !== CallingState.LEFT) {
      try {
        await call.leave();
      } catch (err) {
        console.error("Failed to leave call", err);
      }
    }
    setPhase("ended");
  };

  return { call, phase, errorMessage, endCall };
}
