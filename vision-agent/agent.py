"""AI language teacher voice agent.

Voice-only: joins a Stream call as "agent" and teaches a language through
English using OpenAI Realtime. See AGENTS.md at the repo root for the
project's conventions.

Run:
    uv run agent.py run                          # console mode (opens a demo call)
    uv run agent.py serve --host 0.0.0.0 --port 8000   # HTTP server mode

In `serve` mode, sessions are started/stopped over HTTP by the Expo backend
(see app/api/agent/start+api.ts and stop+api.ts) via the endpoints
Runner.serve() already provides:
    POST   /calls/{call_id}/sessions              -> start
    DELETE /calls/{call_id}/sessions/{session_id}  -> stop (idempotent)
Both endpoints require the X-Agent-Service-Secret header to match
VISION_AGENT_SERVICE_SECRET below -- this service has no other auth, so it
must never be exposed beyond the Expo backend that proxies to it.
"""

import os
from pathlib import Path
from typing import Any

from dotenv import load_dotenv
from fastapi import Header, HTTPException, status
from vision_agents.core import Agent, Runner, ServeOptions, User
from vision_agents.core.agents import AgentLauncher
from vision_agents.core.instructions import Instructions
from vision_agents.plugins import getstream, openai

# STREAM_API_KEY / STREAM_API_SECRET / VISION_AGENT_SERVICE_SECRET already
# live in the Expo app's root .env; OPENAI_API_KEY is added there too. This
# service has no .env of its own (see vision-agent/.env.example for the
# variable names it expects).
load_dotenv(Path(__file__).resolve().parent.parent / ".env")

VISION_AGENT_SERVICE_SECRET = os.environ.get("VISION_AGENT_SERVICE_SECRET")

DEFAULT_INSTRUCTIONS = (
    "You are a warm, encouraging AI language teacher, always speaking and "
    "responding in English. Keep responses short and conversational, since "
    "this is a voice-only call. You teach absolute beginners: introduce "
    "words and phrases slowly, explain what they mean in English, have the "
    "student repeat them out loud, and correct mistakes gently."
)


def _require_service_secret(x_agent_service_secret: str = Header(default="")) -> None:
    """Restricts every session-control endpoint to the Expo backend, the
    only caller that should ever reach this service -- see
    app/api/agent/start+api.ts and stop+api.ts, and lib/vision-agent-client.ts."""
    if not VISION_AGENT_SERVICE_SECRET or x_agent_service_secret != VISION_AGENT_SERVICE_SECRET:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized"
        )


async def create_agent(**kwargs) -> Agent:
    return Agent(
        edge=getstream.Edge(),
        agent_user=User(name="AI Teacher", id="agent"),
        instructions=DEFAULT_INSTRUCTIONS,
        llm=openai.Realtime(send_video=False),
    )


def _build_lesson_instructions(context: dict[str, Any]) -> str:
    """Turns the resolved lesson context written to the call's custom data by
    app/api/agent/start+api.ts into this session's system instructions.
    Falls back to a generic persona when a call has no lesson context, e.g.
    `uv run agent.py run` demo mode."""
    if not context:
        return DEFAULT_INSTRUCTIONS

    vocabulary = context.get("vocabulary") or []
    phrases = context.get("phrases") or []

    def _format(items: list[dict[str, Any]], primary_key: str) -> str:
        lines = []
        for item in items:
            line = f"- {item.get(primary_key)} = {item.get('translation')}"
            pronunciation = item.get("pronunciation")
            if pronunciation:
                line += f" (pronounced: {pronunciation})"
            lines.append(line)
        return "\n".join(lines) if lines else "(none)"

    focus_areas = ", ".join(context.get("focusAreas") or []) or "(none)"

    return (
        f"{context.get('systemPrompt') or DEFAULT_INSTRUCTIONS}\n\n"
        f"Lesson: {context.get('lessonTitle', '')} ({context.get('languageName', '')})\n"
        f"Goal: {context.get('goal', '')}\n"
        f"Focus areas: {focus_areas}\n\n"
        f"Vocabulary to teach:\n{_format(vocabulary, 'word')}\n\n"
        f"Phrases to teach:\n{_format(phrases, 'text')}\n\n"
        "Keep responses short and conversational, since this is a voice-only "
        "call. Always speak and respond in English, introducing the target "
        "language slowly, having the student repeat words out loud, and "
        "correcting mistakes gently."
    )


async def join_call(agent: Agent, call_type: str, call_id: str, **kwargs) -> None:
    call = await agent.create_call(call_type, call_id)

    context: dict[str, Any] = call.custom_data or {}
    agent.instructions = Instructions(input_text=_build_lesson_instructions(context))
    greeting = context.get("greeting") or (
        "Greet the student in English and let them know you're ready to "
        "start the lesson."
    )

    async with agent.join(call):
        await agent.simple_response(text=greeting)
        await agent.finish()


runner = Runner(
    AgentLauncher(
        create_agent=create_agent,
        join_call=join_call,
        # Reclaims the session if the mobile app terminates without running
        # its unmount cleanup (see hooks/useVisionAgentSession.ts) and the
        # agent is left alone on the call.
        agent_idle_timeout=45.0,
        # One agent per call -- the Expo backend's own session registry
        # (lib/agent-session-registry.ts) already prevents duplicate starts;
        # this is a second, SDK-enforced backstop.
        max_sessions_per_call=1,
        # Hard cap so a stuck session can't run indefinitely.
        max_session_duration_seconds=1800.0,
    ),
    serve_options=ServeOptions(
        can_start_session=_require_service_secret,
        can_close_session=_require_service_secret,
        can_view_session=_require_service_secret,
        can_view_metrics=_require_service_secret,
    ),
)

if __name__ == "__main__":
    runner.cli()
