import { verifyToken } from "@clerk/backend";

// Server-only. Never import this from a screen or component — it reads
// CLERK_SECRET_KEY, which must never reach the client bundle.

/**
 * Verifies the Clerk session token sent by the mobile client and returns the
 * authenticated Clerk user id. The client never supplies its own user id —
 * it is always derived here, from the verified token's `sub` claim.
 */
export async function requireClerkUserId(request: Request): Promise<string> {
  const authHeader = request.headers.get("Authorization");
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length)
    : undefined;

  if (!token || !process.env.CLERK_SECRET_KEY) {
    throw unauthorized();
  }

  try {
    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });
    return payload.sub;
  } catch {
    throw unauthorized();
  }
}

export function unauthorized() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}
