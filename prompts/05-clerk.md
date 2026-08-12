Read AGENTS.md first and follow it strictly.

Study the existing auth screens and current mocked auth flow, then replace the mock behavior with real Clerk authentication by following the Clerk documentation provided below. Use the "JavaScript Only (Custom Flow)" integration mode (`useSignIn`/`useSignUp` hooks) for email sign-up, sign-in, and verification. Only use "JS + Native Sign-In" if adding native OAuth (e.g. native Google/Apple sign-in), and note that native OAuth requires a development build — it does not work in Expo Go.

Keep the existing UI and navigation flow intact. Implement passwordless, email-code based Sign Up and Sign In (six-digit verification code, matching the existing modal), social auth where supported, and verification code handling through Clerk.

After successful verification/authentication, navigate to the home route (`/`). For the route guard, wait until Clerk's `isLoaded` is true before redirecting — don't navigate while it's still loading. Once loaded, send the user to `/` if `isSignedIn` is true, otherwise to `/onboarding`.

Do not change the screen design. If there is any need, ask me before implementation

---

Reference: [**Clerk Expo quickstart**](https://clerk.com/docs/expo/getting-started/quickstart) — see its "Custom Flow" section for the passwordless email-code implementation. If a newer version of this doc is available, paste it here instead.