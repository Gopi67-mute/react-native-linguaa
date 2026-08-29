import { useEffect, useRef, useState } from "react";
import { useAuth } from "@clerk/expo";

export type AgentConnectionStatus =
  | "idle"
  | "connecting"
  | "connected"
  | "failed";

type GetToken = () => Promise<string | null>;

const STATUS_POLL_INTERVAL_MS = 8000;

async function authedFetch(
  path: string,
  getToken: GetToken,
  init?: RequestInit,
): Promise<any> {
  const clerkToken = await getToken();
  if (!clerkToken) {
    throw new Error("Not signed in");
  }
  const res = await fetch(path, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${clerkToken}`,
    },
  });
  if (!res.ok) {
    const detail = await res.json().catch(() => null);
    throw new Error(detail?.error ?? `${path} failed: ${res.status}`);
  }
  return res.json();
}

function authedJson(path: string, getToken: GetToken, body: unknown) {
  return authedFetch(path, getToken, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

/**
 * Starts the AI teacher's Vision Agent session once the lesson call is
 * joined (mount), polls its liveness while connected so a post-join failure
 * (e.g. the LLM connection erroring out on the Python service) surfaces as
 * "failed" instead of staying stuck on "connected", and stops it on unmount.
 * See app/api/agent/start+api.ts / status+api.ts / stop+api.ts and
 * vision-agent/agent.py. Must be mounted only after the human has already
 * joined the Stream call (see useLessonCall).
 */
export function useVisionAgentSession(
  lessonId: string,
  languageCode: string,
): AgentConnectionStatus {
  const { getToken } = useAuth();
  const [status, setStatus] = useState<AgentConnectionStatus>("idle");
  const sessionIdRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    let pollTimer: ReturnType<typeof setInterval> | undefined;
    setStatus("connecting");

    authedJson("/api/agent/start", getToken, { lessonId, languageCode })
      .then((session) => {
        if (cancelled) return;
        sessionIdRef.current = session.sessionId;
        setStatus("connected");

        pollTimer = setInterval(() => {
          const sessionId = sessionIdRef.current;
          if (!sessionId) return;
          authedFetch(
            `/api/agent/status?lessonId=${encodeURIComponent(lessonId)}&sessionId=${encodeURIComponent(sessionId)}`,
            getToken,
          )
            .then((result) => {
              if (cancelled || !sessionIdRef.current) return;
              if (!result.active) {
                // The session disappeared without us requesting a stop --
                // the agent died after joining (e.g. an LLM connection error).
                sessionIdRef.current = undefined;
                setStatus("failed");
                if (pollTimer) clearInterval(pollTimer);
              }
            })
            .catch((err) => {
              console.error("Failed to check Vision Agent session status", err);
            });
        }, STATUS_POLL_INTERVAL_MS);
      })
      .catch((err) => {
        console.error("Failed to start Vision Agent session", err);
        if (!cancelled) setStatus("failed");
      });

    return () => {
      cancelled = true;
      if (pollTimer) clearInterval(pollTimer);
      const sessionId = sessionIdRef.current;
      sessionIdRef.current = undefined;
      if (sessionId) {
        authedJson("/api/agent/stop", getToken, { lessonId, sessionId }).catch(
          (err) => console.error("Failed to stop Vision Agent session", err),
        );
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId, languageCode]);

  return status;
}
