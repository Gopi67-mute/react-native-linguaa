import { requireClerkUserId } from "@/lib/clerk-server";
import {
  LESSON_CALL_TYPE,
  getLessonCallId,
  getStreamServerClient,
  getVisionAgentUserId,
} from "@/lib/stream-server";

// Creates (or fetches) the audio-only Stream call for one lesson session.
// The call is scoped to (lessonId, clerkUserId) so each learner gets their
// own call per lesson, and it always includes a separate Vision Agent
// identity (namespaced away from Clerk user ids) so the AI teacher has a
// seat reserved in the call before it can actually join.
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
  if (!lessonId) {
    return Response.json({ error: "lessonId is required" }, { status: 400 });
  }

  const streamClient = getStreamServerClient();
  const aiTeacherUserId = getVisionAgentUserId(lessonId);
  const callId = getLessonCallId(lessonId, clerkUserId);

  await streamClient.upsertUsers([{ id: aiTeacherUserId, name: "AI Teacher" }]);

  await streamClient.video.call(LESSON_CALL_TYPE, callId).getOrCreate({
    data: {
      created_by_id: clerkUserId,
      members: [{ user_id: clerkUserId }, { user_id: aiTeacherUserId }],
      video: false,
      custom: { lessonId, aiTeacherUserId },
      settings_override: {
        video: {
          enabled: false,
          camera_default_on: false,
          target_resolution: {
            width: 240,
            height: 240,
          },
        },
      },
    },
  });

  return Response.json({
    callId,
    callType: LESSON_CALL_TYPE,
    aiTeacherUserId,
  });
}
