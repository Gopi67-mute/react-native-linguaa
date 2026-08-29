export type StreamSession = {
  apiKey: string;
  token: string;
  userId: string;
  userName: string;
  userImage?: string;
};

type GetToken = () => Promise<string | null>;

async function authedFetch(path: string, getToken: GetToken, init?: RequestInit) {
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
    throw new Error(`${path} failed: ${res.status}`);
  }
  return res.json();
}

/** Fetches a fresh Stream Video session for the signed-in user. Also doubles
 * as the `tokenProvider` the SDK re-calls on refresh. */
export function fetchStreamSession(getToken: GetToken): Promise<StreamSession> {
  return authedFetch("/api/stream/token", getToken, { method: "POST" });
}

export type LessonCallSession = {
  callId: string;
  callType: string;
  aiTeacherUserId: string;
};

/** Creates (or fetches) the audio call for one lesson session. */
export function createLessonCall(
  getToken: GetToken,
  lessonId: string,
): Promise<LessonCallSession> {
  return authedFetch("/api/stream/call", getToken, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lessonId }),
  });
}
