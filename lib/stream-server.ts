import { StreamClient } from "@stream-io/node-sdk";

// Server-only. Never import this from a screen or component — it reads
// STREAM_API_SECRET, which must never reach the client bundle.

let client: StreamClient | undefined;

export function getStreamServerClient(): StreamClient {
  if (!client) {
    const apiKey = process.env.STREAM_API_KEY;
    const apiSecret = process.env.STREAM_API_SECRET;
    if (!apiKey || !apiSecret) {
      throw new Error("Missing STREAM_API_KEY or STREAM_API_SECRET");
    }
    client = new StreamClient(apiKey, apiSecret);
  }
  return client;
}

export const LESSON_CALL_TYPE = "default";

/** The Vision Agent's Stream identity is namespaced away from Clerk user ids
 * (which always start with `user_`) so the two identity spaces never collide,
 * even before a real Vision Agent occupies this id. */
export function getVisionAgentUserId(lessonId: string): string {
  return `ai-teacher-${lessonId}`;
}

export function getLessonCallId(lessonId: string, clerkUserId: string): string {
  return `lesson-${lessonId}-${clerkUserId}`;
}
