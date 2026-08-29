// Server-only. Proxies to the Python Vision Agent service (vision-agent/,
// run via `uv run agent.py serve`), which exposes session start/stop over
// HTTP via its own Runner.serve() (see vision_agents.core.runner). Never
// import this from a screen or component — it reads VISION_AGENT_SERVICE_SECRET,
// which authenticates this backend to that service and must never reach the
// client bundle.

const START_TIMEOUT_MS = 8000;
const STOP_TIMEOUT_MS = 5000;
const STATUS_TIMEOUT_MS = 5000;

function getVisionAgentUrl(): string {
  const url = process.env.VISION_AGENT_URL;
  if (!url) {
    throw new Error("Missing VISION_AGENT_URL");
  }
  return url.replace(/\/$/, "");
}

function getServiceSecret(): string {
  const secret = process.env.VISION_AGENT_SERVICE_SECRET;
  if (!secret) {
    throw new Error("Missing VISION_AGENT_SERVICE_SECRET");
  }
  return secret;
}

async function visionAgentFetch(
  path: string,
  init: RequestInit,
  timeoutMs: number,
): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(`${getVisionAgentUrl()}${path}`, {
      ...init,
      signal: controller.signal,
      headers: {
        ...init.headers,
        "X-Agent-Service-Secret": getServiceSecret(),
      },
    });
  } finally {
    clearTimeout(timeout);
  }
}

export type AgentSession = {
  sessionId: string;
  callId: string;
  startedAt: string;
};

/** Starts a new agent session on the Python service for the given call. The
 * service reads all teaching content from the call's own custom data (see
 * vision-agent/agent.py) — this request body only carries the call type. */
export async function startAgentSession(
  callId: string,
  callType: string,
): Promise<AgentSession> {
  const res = await visionAgentFetch(
    `/calls/${encodeURIComponent(callId)}/sessions`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ call_type: callType }),
    },
    START_TIMEOUT_MS,
  );

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Vision Agent start failed (${res.status}): ${detail}`);
  }

  const data = await res.json();
  return {
    sessionId: data.session_id,
    callId: data.call_id,
    startedAt: data.session_started_at,
  };
}

/** Requests closure of one agent session by its exact session id. Idempotent:
 * an unknown session id (already closed, or never existed) 404s and is
 * treated as success rather than an error. */
export async function stopAgentSession(
  callId: string,
  sessionId: string,
): Promise<void> {
  const res = await visionAgentFetch(
    `/calls/${encodeURIComponent(callId)}/sessions/${encodeURIComponent(sessionId)}`,
    { method: "DELETE" },
    STOP_TIMEOUT_MS,
  );

  if (res.status === 404) return;
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Vision Agent stop failed (${res.status}): ${detail}`);
  }
}

/** Returns true if the session is still alive on the Python service. The
 * SDK evicts a session from its registry as soon as its task completes —
 * on a normal stop request, but also immediately on an uncaught crash (e.g.
 * an LLM connection failure) — so "not found" here, when we never asked to
 * stop it ourselves, means the agent died after joining the call. */
export async function isAgentSessionActive(
  callId: string,
  sessionId: string,
): Promise<boolean> {
  const res = await visionAgentFetch(
    `/calls/${encodeURIComponent(callId)}/sessions/${encodeURIComponent(sessionId)}`,
    { method: "GET" },
    STATUS_TIMEOUT_MS,
  );

  if (res.status === 404) return false;
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Vision Agent status check failed (${res.status}): ${detail}`);
  }
  return true;
}
