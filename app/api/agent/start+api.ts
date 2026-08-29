import { requireClerkUserId } from "@/lib/clerk-server";
import { resolveAgentLessonContext } from "@/lib/agent-context";
import { ensureAgentSession } from "@/lib/agent-session-registry";
import {
  LESSON_CALL_TYPE,
  getLessonCallId,
  getStreamServerClient,
  getVisionAgentUserId,
} from "@/lib/stream-server";

// Starts (or reuses) the AI teacher's agent session for one lesson call. The
// client sends only lessonId/languageCode — the lesson's goal, vocabulary,
// phrases, and system prompt are resolved here from trusted learning data
// and written onto the call's custom data, since that's the only channel the
// vision-agent process (vision-agent/agent.py) reads lesson content from —
// the HTTP request that starts its session cannot carry it directly (see
// vision-agent's own Runner.serve() contract, which only accepts a call
// type).
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
  const languageCode =
    typeof body?.languageCode === "string" ? body.languageCode : undefined;
  if (!lessonId) {
    return Response.json({ error: "lessonId is required" }, { status: 400 });
  }

  const context = resolveAgentLessonContext(lessonId, languageCode);
  if (!context) {
    return Response.json({ error: "Unknown lesson" }, { status: 404 });
  }

  // Deriving the call id from (lessonId, clerkUserId) — rather than trusting
  // any call id from the client — means this request can only ever start an
  // agent on the call the authenticated user is actually meant to be in.
  const callId = getLessonCallId(lessonId, clerkUserId);
  const aiTeacherUserId = getVisionAgentUserId(lessonId);

  const streamClient = getStreamServerClient();
  await streamClient.upsertUsers([{ id: aiTeacherUserId, name: "AI Teacher" }]);

  const call = streamClient.video.call(LESSON_CALL_TYPE, callId);
  await call.getOrCreate({
    data: {
      created_by_id: clerkUserId,
      members: [{ user_id: clerkUserId }, { user_id: aiTeacherUserId }],
      video: false,
      settings_override: {
        video: {
          enabled: false,
          camera_default_on: false,
          target_resolution: { width: 240, height: 240 },
        },
      },
    },
  });
  // getOrCreate only applies `data` the first time the call is created, so
  // the teaching context is (re-)written explicitly on every start — this
  // also keeps it fresh if it was created by an older session.
  await call.update({ custom: { aiTeacherUserId, ...context } });

  try {
    const session = await ensureAgentSession(callId, LESSON_CALL_TYPE);
    return Response.json({
      sessionId: session.sessionId,
      callId,
      callType: LESSON_CALL_TYPE,
    });
  } catch (err) {
    console.error("Failed to start Vision Agent session", err);
    return Response.json(
      { error: "Could not start the AI teacher." },
      { status: 502 },
    );
  }
}
