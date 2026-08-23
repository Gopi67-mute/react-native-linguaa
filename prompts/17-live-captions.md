Read AGENTS.md first and follow it strictly.

Use the installed skills for stream and vision agents and implement realtime live captions in the Audio Lesson screen for both the AI teacher's speech and the user's speech, as they happen.

Before implementing, define the caption transport and update contract. Use Stream closed captions for finalized segments, or Vision Agents realtime transcript events when interim text is required. Map each event to its speaker, assign stable segment keys, replace partial text with newer partials, commit final text, preserve segment ordering, and deduplicate repeated events. Clean up all caption subscriptions on unmount. Keep captions in memory only and do not log or persist user speech by default.
