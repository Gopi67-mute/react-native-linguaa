import { startAgentSession, type AgentSession } from "@/lib/vision-agent-client";

// Server-only, in-memory, single Node process. Tracks the one active Vision
// Agent session per Stream call so that concurrent or duplicate start
// requests (e.g. a double-mount in dev, or a retried request) reuse the same
// session instead of joining a second agent onto the same call. This is
// bookkeeping only — the Python service's own session ids are globally
// unique (SDK-generated UUIDs, see vision-agent/agent.py), so a stop request
// can never affect the wrong session even without this registry; this just
// avoids spawning duplicates on start.
//
// A multi-instance production deployment would need a shared store (e.g.
// Redis) here instead of a process-local Map.
const activeSessions = new Map<string, AgentSession>();
const pendingStarts = new Map<string, Promise<AgentSession>>();

export async function ensureAgentSession(
  callId: string,
  callType: string,
): Promise<AgentSession> {
  const existing = activeSessions.get(callId);
  if (existing) return existing;

  const pending = pendingStarts.get(callId);
  if (pending) return pending;

  const startPromise = startAgentSession(callId, callType)
    .then((session) => {
      activeSessions.set(callId, session);
      return session;
    })
    .finally(() => {
      pendingStarts.delete(callId);
    });

  pendingStarts.set(callId, startPromise);
  return startPromise;
}

/** Clears the registry entry only if it still points at the session being
 * stopped, so a delayed/duplicate stop for a superseded session id can never
 * forget a newer one. */
export function forgetAgentSession(callId: string, sessionId: string): void {
  const existing = activeSessions.get(callId);
  if (existing && existing.sessionId === sessionId) {
    activeSessions.delete(callId);
  }
}
