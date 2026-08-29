import { createClerkClient } from "@clerk/backend";

import { requireClerkUserId } from "@/lib/clerk-server";
import { getStreamServerClient } from "@/lib/stream-server";

const STREAM_TOKEN_TTL_SECONDS = 60 * 60 * 4;

// Mints a Stream Video user token for the signed-in Clerk user. The Stream
// user id always comes from the verified Clerk session (see
// requireClerkUserId), never from the request body — a client-supplied user
// id here would let any signed-in user mint a token for someone else.
export async function POST(request: Request) {
  let clerkUserId: string;
  try {
    clerkUserId = await requireClerkUserId(request);
  } catch (response) {
    if (response instanceof Response) return response;
    throw response;
  }

  const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
  const clerkUser = await clerk.users.getUser(clerkUserId);
  const userName =
    [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") ||
    "Learner";
  const userImage = clerkUser.imageUrl || undefined;

  const streamClient = getStreamServerClient();
  await streamClient.upsertUsers([
    { id: clerkUserId, name: userName, image: userImage },
  ]);

  const token = streamClient.generateUserToken({
    user_id: clerkUserId,
    validity_in_seconds: STREAM_TOKEN_TTL_SECONDS,
  });

  return Response.json({
    apiKey: process.env.STREAM_API_KEY,
    token,
    userId: clerkUserId,
    userName,
    userImage,
  });
}
