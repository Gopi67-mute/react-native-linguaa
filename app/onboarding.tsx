import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { usePostHog } from "posthog-react-native";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { colors } from "@/theme";

const MASCOT_MAX_WIDTH = 340;
const MASCOT_ASPECT_RATIO = 420 / 340;
const HORIZONTAL_PADDING = 24 * 2; // matches `px-6` on the screen container

export default function Onboarding() {
  const { width: windowWidth } = useWindowDimensions();
  const posthog = usePostHog();
  const mascotWidth = Math.min(
    MASCOT_MAX_WIDTH,
    windowWidth - HORIZONTAL_PADDING
  );
  const mascotHeight = mascotWidth * MASCOT_ASPECT_RATIO;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View className="flex-1 px-6">
        <View className="flex-row items-center justify-center gap-2 mt-2">
          <Image
            source={images.mascotLogo}
            className="w-9 h-9"
            resizeMode="contain"
          />
          <Text className="text-h1 text-foreground">Lingua</Text>
        </View>

        <View className="mt-10">
          <Text className="text-h1 text-foreground">Your AI language</Text>
          <Text className="text-h1 text-primary">teacher.</Text>
          <Text className="text-body-lg text-muted-foreground mt-3">
            Real conversations, personalized lessons, anytime, anywhere.
          </Text>
        </View>

        <View className="flex-1 items-center justify-center">
          <View
            className="relative items-center"
            style={{ width: mascotWidth }}
          >
            <View
              className="absolute top-20 left-0 rounded-2xl rounded-bl-md bg-[#EAF2FF] px-4 py-2 z-10"
              style={styles.bubbleShadow}
            >
              <Text className="text-body-md text-foreground">Hello!</Text>
            </View>
            <View
              className="absolute top-4 right-2 rounded-2xl rounded-bl-md bg-[#EEECFD] px-4 py-2 z-10"
              style={styles.bubbleShadow}
            >
              <Text className="text-body-md text-primary">¡Hola!</Text>
            </View>
            <View
              className="absolute top-40 -right-2 rounded-2xl rounded-tl-md bg-[#FDEDE7] px-4 py-2 z-10"
              style={styles.bubbleShadow}
            >
              <Text className="text-body-md" style={{ color: "#E15241" }}>
                你好!
              </Text>
            </View>

            <Image
              source={images.mascotWelcome}
              className="mt-10"
              style={{ width: mascotWidth, height: mascotHeight }}
              resizeMode="contain"
            />
          </View>
        </View>

        <Pressable
          onPress={() => {
            posthog.capture('onboarding_started')
            router.push('/sign-up')
          }}
          className="flex-row items-center justify-between bg-primary-deep rounded-full px-6 py-4 mb-6"
          style={styles.buttonShadow}
        >
          <View className="w-6" />
          <Text className="text-h4 text-white">Get Started</Text>
          <Ionicons
            name="chevron-forward"
            size={22}
            color={colors.background}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  bubbleShadow: {
    shadowColor: colors.foreground,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  buttonShadow: {
    shadowColor: colors.primaryDeep,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
});
