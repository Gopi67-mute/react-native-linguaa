Read AGENTS.md first and follow it strictly.

Integrate language selection state. Store the selected language using Zustand with the modern `@react-native-async-storage/async-storage` package. Authentication routing must wait for both Clerk's `isLoaded` state and persisted Zustand language-state hydration before rendering or redirecting. If an authenticated user has no selected language after hydration, route them to the language selection screen. If a saved language exists, keep them on the home route (/). Preserve the existing language-selection and home-route behavior and UI exactly.

Add a development-only button on the home screen route that removes only the selected-language AsyncStorage key, resets the corresponding Zustand in-memory state, and navigates to the language selection screen for testing. Do not use AsyncStorage.clear().
