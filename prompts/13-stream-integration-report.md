# Stream Integration — Implementation Report

Implements `prompts/13-stream-integration.md`: real Stream Video audio-only
calling for the Audio Lesson screen, backed by Clerk-authenticated Expo API
routes. Existing UI and lesson data are unchanged — only wired to a real
backend instead of local mock state.

## Packages installed

Client (native module — requires a dev-client rebuild, not Expo Go):

- `@stream-io/video-react-native-sdk`
- `@stream-io/react-native-webrtc`
- `@config-plugins/react-native-webrtc@13.0.0` (pinned — the `latest` dist-tag requires Expo ≥56; this project is on Expo 54)
- `@react-native-community/netinfo`
- `expo-build-properties`

Server-only (used only inside `app/api/**/+api.ts`, never imported by client code):

- `@clerk/backend` — verifies the Clerk session token server-side
- `@stream-io/node-sdk` — mints Stream tokens and creates calls server-side

`app.json` now registers `@stream-io/video-react-native-sdk`,
`@config-plugins/react-native-webrtc` (with camera/mic permission strings),
and `expo-build-properties` (`minSdkVersion: 24`) as plugins.

## New / changed files

| File | Purpose |
|---|---|
| `lib/clerk-server.ts` | `requireClerkUserId(request)` — verifies the `Authorization: Bearer <token>` header via `@clerk/backend`'s `verifyToken`, returns the verified Clerk user id (`payload.sub`), or throws a `401 Response`. |
| `lib/stream-server.ts` | Server-only `StreamClient` singleton (`STREAM_API_KEY`/`STREAM_API_SECRET`), plus id helpers: `getVisionAgentUserId(lessonId)` → `ai-teacher-<lessonId>`, `getLessonCallId(lessonId, clerkUserId)` → `lesson-<lessonId>-<clerkUserId>`. |
| `app/api/stream/token+api.ts` | `POST` — verifies the session, upserts the Stream user (name/image pulled from Clerk), mints a 4-hour Stream user token. Returns `{ apiKey, token, userId, userName, userImage }`. |
| `app/api/stream/call+api.ts` | `POST` (`{ lessonId }`) — verifies the session, upserts a placeholder **AI Teacher** Stream user, and does `getOrCreate` on a `default`-type call scoped to `(lessonId, clerkUserId)` with both the real user and the AI Teacher as members. Call settings override disables video (`video.enabled: false`) so the call is audio-only at the server level, not just by convention. |
| `lib/stream-client.ts` | Client-safe fetch helpers: `fetchStreamSession(getToken)` and `createLessonCall(getToken, lessonId)`, both attaching the Clerk bearer token. |
| `app/_layout.tsx` | Added `StreamVideoRoot`: creates one `StreamVideoClient` per signed-in session via `getOrCreateInstance` + a `tokenProvider` that re-hits `/api/stream/token`. Mounted once, above the `Stack`, inside `ClerkProvider`. Renders children unwrapped while signed out or still connecting, so navigation is never blocked on the call SDK. |
| `hooks/useLessonCall.ts` | Creates the call via the API route, joins it (`client.call(type, id, { reuseInstance: true })` → `call.join()` → `call.microphone.enable()`), and exposes `{ call, phase, errorMessage, endCall }` with `phase` in `connecting \| joined \| error \| ended`. Leaves the call on unmount, guarded against double-leave. |
| `hooks/useCallAudioControls.ts` | Must run inside `<StreamCall>`. Wraps `useCallStateHooks().useMicrophoneState()` for real mute state/toggle, and `callManager.speaker.setForceSpeakerphoneOn()` for the speaker toggle (React Native has no reactive speaker-state hook, per Stream's docs — confirmed against the installed SDK's `CallManager` type). |
| `app/lesson/[id].tsx` | Restructured (see below). |
| `.env` | Added `CLERK_SECRET_KEY=` placeholder — **needs your value from the Clerk dashboard.** |

## `app/lesson/[id].tsx` restructuring

The pixel layout, copy, mascot, script flow, XP completion, and
`TeacherStage`/`CallControls`/`SessionFeedback` components are all
unchanged. What changed is *where the props come from*:

- `AudioLessonSession` now calls `useLessonCall(lesson.id)` and branches on
  `phase`:
  - `connecting` (or no `call` yet) → spinner screen, "Connecting…"
  - `error` → error screen with the failure message and a "Back to Lessons" button
  - `ended` → "Lesson ended" screen with a "Back to Lessons" button
  - otherwise → renders the original screen body, now wrapped in `<StreamCall call={call}>`
- The original screen body (header, lesson info, `TeacherStage`,
  `SessionFeedback`) moved into a new `AudioLessonBody` component so it can
  call `useCallStateHooks()` / `useCallAudioControls()`, which only work
  inside `<StreamCall>`.
- Header changes (the only visual additions):
  - The static green dot + "Online" text is now a live label driven by
    `useCallCallingState()` + real mute state: **Connecting…**,
    **Reconnecting…**, **Live** (green), **Muted** (red), **Connection
    lost** (red), **Call ended**.
  - A small 28px avatar (Clerk `user.imageUrl`, or an initial-letter circle
    as fallback) was added next to the timer chip — the "user info"
    requirement.
- Mute, speaker, and end-call buttons in `CallControls` are unchanged
  visually; they now call `microphone.toggle()`,
  `callManager.speaker.setForceSpeakerphoneOn()`, and `call.leave()`
  respectively instead of flipping local mock state.

## Identity model

- **Clerk user → Stream user id:** the raw Clerk user id (e.g. `user_2abc…`),
  verified server-side from the session token on every request. The client
  never supplies its own user id to either API route.
- **Vision Agent identity:** `ai-teacher-<lessonId>` — a distinct namespace
  (Clerk ids always start with `user_`, agent ids never do), so the two
  identity spaces can't collide. The agent user is upserted and added as a
  call member now, ready for the real Vision Agent (prompt 14) to occupy
  that identity later; nothing currently publishes media as that user.
- **Call id:** `lesson-<lessonId>-<clerkUserId>` — one call per learner per
  lesson.

## Verification done

- `npx tsc --noEmit` — clean on every file touched by this change. (Two
  pre-existing errors remain in `app/(auth)/sign-up.tsx` and
  `app/language-selection.tsx`, unrelated to this work and unmodified by it.)
- `npx expo lint` — clean, exit code 0.
- Not yet run: an on-device smoke test (join/mute/speaker/end), since the
  new native modules require a dev-client rebuild first (see below).

## What you still need to do

1. **Add `CLERK_SECRET_KEY`** to `.env` (Clerk dashboard → Configure → API
   Keys → Secret keys). The token/call routes will 401 without it.
2. **Rebuild the dev client** — new native modules were installed:
   ```
   npx expo prebuild --clean
   npx expo run:ios   # or run:android
   ```
   Expo Go will not run this build anymore.
3. **Test on a real device**, not just a simulator — the iOS Simulator has
   no microphone.
4. **Production note:** Expo Router API routes are reached via relative
   `fetch("/api/...")`, which the native client auto-resolves to the Metro
   dev-server origin during `expo start`. That auto-resolution does not
   exist in a production build — a deployed API host and the Expo Router
   config plugin's `origin` option will need to be set up before shipping
   (out of scope for this prompt).
