import { requireClerkUserId } from "@/lib/clerk-server";
import { forgetAgentSession } from "@/lib/agent-session-registry";
import { getLessonCallId } from "@/lib/stream-server";
import { stopAgentSession } from "@/lib/vision-agent-client";

// Stops one agent session. The call id is derived from (lessonId,
// clerkUserId) exactly as in start+api.ts — never trusted from the client —
// so a request can only ever target the requesting user's own lesson call.
// Stopping is idempotent: the session id the client supplies is the exact
// one it was handed by /api/agent/start, the Python service 404s (treated as
// success) if it's already gone, and a stale/duplicate stop can never affect
// a different, newer session since session ids are unique per agent instance.
export async function POST(request: Request) {
  let clerkUserId: string;
  try {
    clerkUserId = await requireClerkUserId(request);
  } catch (response) {
    if (response instanceof Response) return response;
    throw response;
  }

  const body = await request.json().catch(() => null);
  const lessonId =
    typeof body?.lessonId === "string" ? body.lessonId : undefined;
  const sessionId =
    typeof body?.sessionId === "string" ? body.sessionId : undefined;
  if (!lessonId || !sessionId) {
    return Response.json(
      { error: "lessonId and sessionId are required" },
      { status: 400 },
    );
  }

  const callId = getLessonCallId(lessonId, clerkUserId);

  try {
    await stopAgentSession(callId, sessionId);
  } catch (err) {
    console.error("Failed to stop Vision Agent session", err);
    return Response.json(
      { error: "Could not stop the AI teacher." },
      { status: 502 },
    );
  }

  forgetAgentSession(callId, sessionId);
  return Response.json({ ok: true });
}
