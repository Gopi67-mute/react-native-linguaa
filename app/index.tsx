import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-h1 mb-40 color-primary-deep">AuraStack</Text>
      <Link href="/onboarding" asChild>
        <Pressable>
          <Text className="text-h4 text-primary-deep">Go to Onboarding</Text>
        </Pressable>
      </Link>
    </View>
  );
}
