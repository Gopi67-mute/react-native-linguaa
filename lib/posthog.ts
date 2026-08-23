import PostHog from 'posthog-react-native'
import Constants from 'expo-constants'

// Configuration loaded from app.config.js extras via expo-constants.
// POSTHOG_PROJECT_TOKEN and POSTHOG_HOST are read at build time in app.config.js.
const projectToken = Constants.expoConfig?.extra?.posthogProjectToken as string | undefined
const host = (Constants.expoConfig?.extra?.posthogHost as string | undefined) ?? 'https://us.i.posthog.com'

const isPostHogConfigured = Boolean(projectToken)

if (__DEV__) {
  if (!isPostHogConfigured) {
    console.error(
      'POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, ' +
        'this causes events to be silently missed. ' +
        'This error stops appearing once POSTHOG_PROJECT_TOKEN is configured',
    )
  }
}

/**
 * PostHog client instance for the Duoligo Expo app.
 *
 * Configured via app.config.js extras (reads POSTHOG_PROJECT_TOKEN and
 * POSTHOG_HOST from the build-time environment).
 *
 * @see https://posthog.com/docs/libraries/react-native
 */
export const posthog = new PostHog(projectToken ?? 'placeholder_key', {
  host,

  // Disable analytics when no token is configured
  disabled: !isPostHogConfigured,

  // Capture app lifecycle events automatically
  captureAppLifecycleEvents: true,

  // Batching settings for battery-friendly delivery
  flushAt: 20,
  flushInterval: 10000,
  maxBatchSize: 100,
  maxQueueSize: 1000,

  // Feature flags
  preloadFeatureFlags: true,
  sendFeatureFlagEvent: true,
  featureFlagsRequestTimeoutMs: 10000,

  // Network resilience
  requestTimeout: 10000,
  fetchRetryCount: 3,
  fetchRetryDelay: 3000,
})

// Verbose logging in development (debug is a method, not a constructor option, in this SDK version)
posthog.debug(__DEV__)

export const isPostHogEnabled = isPostHogConfigured
