Read AGENTS.md first and follow it strictly.

Use the installed GetStream agent skills and the Stream docs to implement Stream audio call setup for the selected lesson flow. When a user taps a lesson, keep the existing Audio Lesson screen UI and add the ability to start, join, mute/unmute, and end an audio-only Stream call.

Use Expo API routes for Stream token generation and call creation. Validate the Clerk session server-side and reject unauthenticated requests before issuing a token or creating a call. Derive the Clerk user identity from the validated session, never from a mobile-supplied user ID, and bind the user call to that authenticated Clerk user. Keep the Vision Agent identity separate from the Clerk user identity. Do not expose Stream secrets in the Expo app.

Preserve the existing UI and lesson data. Add clear loading, joined, error, muted, connecting, ended states and user info on audio ui.
