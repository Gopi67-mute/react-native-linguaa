Read AGENTS.md first and follow it strictly.

Add and pin the `posthog-react-native` SDK to an exact version. Use the shared `posthog` instance exported from `lib/posthog.ts`; do not reinitialize PostHog or change the existing PostHogProvider setup.

User identification:

- After Clerk authentication completes in both sign-in and sign-up flows, call `posthog.identify()` with the Clerk user's id as `distinctId`.
- On identification, set `signup_date` to the current ISO date only once via `$set_once`, and update `preferred_language` on every identification. Use `null` when no language is available.
- Add coverage for both sign-in and sign-up identification, including repeated identification calls.

Four custom events, captured at these moments:

1. language_selected — fires when the user confirms their language on the language selection screen.
   Properties: { language_code: string, language_name: string }

2. lesson_started — fires when the lesson screen mounts and the user begins the lesson.
   Properties: { lesson_id: string, language_code: string, lesson_number: number }

3. lesson_completed — fires when the user has completed all required lesson activities/questions. Persist the lesson completion state before navigating away from the lesson, then capture this event.
   Properties: { lesson_id: string, language_code: string, lesson_number: number }

4. lesson_abandoned — fires when the user exits a lesson before lesson_completed fires (back navigation, screen unmount before completion).
   Properties: { lesson_id: string, time_into_lesson_seconds: number, last_question_index: number }

Implementation rules:

- Track lesson start time with a ref captured on mount so time_into_lesson_seconds is accurate.
- Use one cleanup path for lesson exits. It must emit lesson_abandoned only when the lesson is incomplete and guard against emitting it more than once.
- Mark the lesson complete and persist that state before navigating after completion so cleanup does not report a completed lesson as abandoned.
- Do not modify any UI.
- Do not expose any keys; PostHog is already configured via environment variables.
