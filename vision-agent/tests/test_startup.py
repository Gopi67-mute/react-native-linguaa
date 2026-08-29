"""Startup smoke tests -- confirm the service wires up cleanly.

Run:
    uv run pytest
"""

import os

import pytest
from fastapi.testclient import TestClient
from vision_agents.core import Agent, Runner
from vision_agents.core.agents import AgentLauncher

import agent as agent_module

HAS_CREDENTIALS = all(
    os.getenv(key)
    for key in ("STREAM_API_KEY", "STREAM_API_SECRET", "OPENAI_API_KEY")
)


def test_module_wires_up_a_runner():
    """Importing agent.py and building the runner shouldn't touch the
    network or require credentials -- it just proves the Agent/Runner/
    AgentLauncher construction matches this installed SDK version."""
    assert isinstance(agent_module.runner, Runner)
    assert isinstance(agent_module.runner._launcher, AgentLauncher)


def test_health_endpoint_responds_without_starting_a_session():
    """/health has no dependency on the launcher being warmed up, so this
    confirms the FastAPI app itself boots even without credentials."""
    with TestClient(agent_module.runner.fast_api) as client:
        response = client.get("/health")
    assert response.status_code == 200


def test_build_lesson_instructions_falls_back_without_context():
    assert (
        agent_module._build_lesson_instructions({})
        == agent_module.DEFAULT_INSTRUCTIONS
    )


def test_build_lesson_instructions_includes_resolved_lesson_content():
    context = {
        "systemPrompt": "You are Sofia, a Spanish teacher.",
        "lessonTitle": "Say Hello",
        "languageName": "Spanish",
        "goal": "Learn how to greet people.",
        "focusAreas": ["greetings", "pronunciation"],
        "vocabulary": [{"word": "Hola", "translation": "Hello", "pronunciation": "OH-lah"}],
        "phrases": [{"text": "¿Cómo estás?", "translation": "How are you?"}],
    }
    instructions = agent_module._build_lesson_instructions(context)
    assert "You are Sofia, a Spanish teacher." in instructions
    assert "Say Hello (Spanish)" in instructions
    assert "Hola = Hello (pronounced: OH-lah)" in instructions
    assert "¿Cómo estás? = How are you?" in instructions
    assert "greetings, pronunciation" in instructions


def test_session_endpoints_require_service_secret():
    """can_start_session/can_close_session reject before ever touching the
    launcher, so this needs no Stream/OpenAI credentials."""
    with TestClient(agent_module.runner.fast_api) as client:
        missing = client.post(
            "/calls/test-call/sessions", json={"call_type": "default"}
        )
        wrong = client.post(
            "/calls/test-call/sessions",
            json={"call_type": "default"},
            headers={"X-Agent-Service-Secret": "wrong-secret"},
        )
    assert missing.status_code == 401
    assert wrong.status_code == 401


@pytest.mark.skipif(
    not HAS_CREDENTIALS,
    reason="STREAM_API_KEY, STREAM_API_SECRET, and OPENAI_API_KEY must all be set",
)
async def test_create_agent_starts_cleanly():
    """Full startup check: build the real Agent against live credentials
    (no call is created or joined) and make sure it closes cleanly."""
    agent = await agent_module.create_agent()
    try:
        assert isinstance(agent, Agent)
        assert agent.agent_user.id == "agent"
    finally:
        await agent.close()
