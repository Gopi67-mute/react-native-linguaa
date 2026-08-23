import "../global.css";

import { useEffect, useRef } from "react";
import { ClerkProvider, useUser } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { useFonts } from "expo-font";
import { Stack, usePathname, useGlobalSearchParams } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { PostHogProvider } from "posthog-react-native";

import { posthog } from "@/lib/posthog";

import { fontAssets } from "@/theme";

SplashScreen.preventAutoHideAsync();

if (!process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function RootLayout() {
  const [fontsLoaded] = useFonts(fontAssets);
  const pathname = usePathname();
  const params = useGlobalSearchParams();
  const previousPathname = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Manual screen tracking for Expo Router
  // @see https://posthog.com/docs/libraries/react-native#screen-tracking
  useEffect(() => {
    if (previousPathname.current !== pathname) {
      posthog.screen(pathname, {
        previous_screen: previousPathname.current ?? null,
        ...params,
      });
      previousPathname.current = pathname;
    }
  }, [pathname, params]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PostHogProvider
      client={posthog}
      autocapture={{
        captureScreens: false, // Manual tracking with Expo Router
        captureTouches: true,
        propsToCapture: ['testID'],
        maxElementsCaptured: 20,
      }}
    >
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        {/* Identify authenticated users in PostHog whenever auth state changes */}
        <AuthObserver />
        <Stack screenOptions={{ headerShown: false }} />
      </ClerkProvider>
    </PostHogProvider>
  );
}

/**
 * Identifies the current Clerk user in PostHog whenever auth state changes.
 * Runs inside ClerkProvider so it has access to Clerk hooks.
 * Handles first-time logins, sign-ups, and returning visitor sessions.
 */
function AuthObserver() {
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      posthog.identify(user.id, {
        $set: {
          ...(user.firstName ? { first_name: user.firstName } : {}),
          ...(user.lastName ? { last_name: user.lastName } : {}),
        },
        $set_once: { first_seen_date: new Date().toISOString() },
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn, user?.id]); // user?.id is the stable identity key — re-running on the full object would cause thrashing

  return null;
}
