import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { colors } from "@/theme";

export default function Onboarding() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View className="flex-1 px-6">
        <View className="flex-row items-center justify-center gap-2 mt-2">
          <Image
            source={images.mascotLogo}
            style={styles.logoImage}
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
          <View style={styles.mascotWrapper}>
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
              style={styles.mascotImage}
              resizeMode="contain"
            />
          </View>
        </View>

        <Pressable
          onPress={() => router.back()}
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
  logoImage: { width: 36, height: 36 },
  mascotWrapper: { position: "relative", width: 340, alignItems: "center" },
  mascotImage: { width: 340, height: 420, marginTop: 40 },
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
