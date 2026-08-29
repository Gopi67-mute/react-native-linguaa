Read AGENTS.md first and follow it strictly.

Use the installed Vision Agents skill to create a Python service at vision-agent/ inside this repo. It is the AI language teacher, voice only, using OpenAI Realtime as the LLM and Stream Edge for transport.

Read `STREAM_API_KEY`, `STREAM_API_SECRET` from the parent, .env and add `OPENAI_API_KEY`. Add placeholder variable names only to `vision-agent/.env.example`; do not create or copy a `vision-agent/.env` file. Never commit or log credentials. Obtain approval before adding any Python dependencies. By default the teacher always speaks English and teaches the selected language through English.

Before creating the `vision-agent` service or modifying dependency manifests, identify and record the exact versions of the required Vision Agents, OpenAI, and Stream packages, then obtain my approval before adding them. After approval, verify the installed SDK's actual join and lifecycle method shapes, implement the service using those APIs, and add a startup smoke test that confirms it starts cleanly.
