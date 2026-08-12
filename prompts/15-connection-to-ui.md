Read AGENTS.md first and follow it strictly.

Use the installed Vision Agents skill and Stream skills to connect the Audio Lesson screen to the Vision Agent so the AI teacher joins the same Stream call as the user. 

Add Expo API routes to start and stop the agent that proxy to the Vision Agent server, and pack the selected lesson, language, goals, vocabulary, phrases, and AI teacher prompt into the Stream call's custom data so the agent can read it on join. Update the Python agent to actually consume those fields.

The agent's Stream identity and token must be created and owned entirely server-side (in the Expo API routes / Vision Agent server) — never derive it from mobile-provided values or the logged-in Clerk user. Grant the agent only the Stream capability needed to publish audio and call goLive() in audio_room; verify against the installed SDK whether that needs an elevated/admin role or a narrower scoped role, and use the minimum that works. Verify the SDK's actual agent creation, token issuance, and cleanup APIs before implementing. Clean up the agent session both when the user ends the call and when the screen unmounts. 

Do not expose any secrets in the mobile app. Keep the existing Stream audio flow intact. Show the agent connection status with idle, connecting, connected, and failed states.