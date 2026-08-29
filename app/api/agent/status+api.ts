import { requireClerkUserId } from "@/lib/clerk-server";
import { getLessonCallId } from "@/lib/stream-server";
import { isAgentSessionActive } from "@/lib/vision-agent-client";

// Lets the client poll whether its agent session is still alive, so a
// post-join failure on the Python service (e.g. the LLM connection erroring
// out) can surface as "failed" in the UI instead of staying stuck on
// "connected" forever — see hooks/useVisionAgentSession.ts. The call id is
// derived the same way as start/stop+api.ts, never trusted from the client.
export async function GET(request: Request) {
  let clerkUserId: string;
  try {
    clerkUserId = await requireClerkUserId(request);
  } catch (response) {
    if (response instanceof Response) return response;
    throw response;
  }

  const url = new URL(request.url);
  const lessonId = url.searchParams.get("lessonId");
  const sessionId = url.searchParams.get("sessionId");
  if (!lessonId || !sessionId) {
    return Response.json(
      { error: "lessonId and sessionId are required" },
      { status: 400 },
    );
  }

  const callId = getLessonCallId(lessonId, clerkUserId);

  try {
    const active = await isAgentSessionActive(callId, sessionId);
    return Response.json({ active });
  } catch (err) {
    console.error("Failed to check Vision Agent session status", err);
    return Response.json(
      { error: "Could not check the AI teacher's status." },
      { status: 502 },
    );
  }
}
