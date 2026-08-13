import { Image, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { images } from "@/constants/images";
import { colors } from "@/theme";

export function AuthMascot() {
  return (
    <View className="items-center justify-center my-4">
      <View className="w-52 h-52 items-center justify-center">
        <View className="absolute top-2 left-2">
          <Ionicons name="sparkles" size={22} color={colors.streak} />
        </View>
        <View className="absolute top-10 right-4">
          <Ionicons name="sparkles" size={16} color={colors.blue} />
        </View>
        <View className="absolute bottom-10 right-8">
          <Ionicons name="sparkles" size={14} color={colors.streak} />
        </View>

        <Image
          source={images.mascotAuth}
          style={{ width: 200, height: 200 }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}
