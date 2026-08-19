import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/theme";

export default function Profile() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-h2 text-foreground">Profile</Text>
        <Text className="text-body-md text-muted-foreground mt-2 text-center">
          Your profile is coming soon.
        </Text>
      </View>
    </SafeAreaView>
  );
}
