import { Ionicons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "@/theme";

type IconName = keyof typeof Ionicons.glyphMap;

const TAB_ICONS: Record<string, { active: IconName; inactive: IconName }> = {
  index: { active: "home", inactive: "home-outline" },
  learn: { active: "book", inactive: "book-outline" },
  "ai-teacher": { active: "happy", inactive: "happy-outline" },
  chat: {
    active: "chatbubble-ellipses",
    inactive: "chatbubble-ellipses-outline",
  },
  profile: { active: "person", inactive: "person-outline" },
};

const TAB_BAR_HEIGHT = 64;
const CIRCLE_SIZE = 48;

export function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const [barWidth, setBarWidth] = useState(0);
  const tabWidth = state.routes.length > 0 ? barWidth / state.routes.length : 0;

  const activeIndex = useSharedValue(state.index);

  useEffect(() => {
    activeIndex.value = withTiming(state.index, {
      duration: 250,
      easing: Easing.out(Easing.cubic),
    });
  }, [state.index, activeIndex]);

  const circleStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: activeIndex.value * tabWidth + (tabWidth - CIRCLE_SIZE) / 2 },
    ],
  }));

  return (
    <View
      style={[styles.shadow, { paddingBottom: insets.bottom }]}
      className="bg-background rounded-t-3xl"
    >
      <View
        onLayout={(event) => setBarWidth(event.nativeEvent.layout.width)}
        style={{ height: TAB_BAR_HEIGHT }}
        className="flex-row items-center px-2"
      >
        {barWidth > 0 && (
          <Animated.View
            pointerEvents="none"
            style={[
              styles.circle,
              { top: (TAB_BAR_HEIGHT - CIRCLE_SIZE) / 2 },
              circleStyle,
            ]}
          />
        )}

        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.title ?? route.name;
          const isFocused = state.index === index;
          const icons = TAB_ICONS[route.name] ?? TAB_ICONS.index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              className="flex-1 items-center justify-center"
              style={{ height: TAB_BAR_HEIGHT }}
            >
              {isFocused ? (
                <Ionicons name={icons.active} size={22} color="#fff" />
              ) : (
                <View className="items-center justify-center gap-1">
                  <Ionicons
                    name={icons.inactive}
                    size={22}
                    color={colors.mutedForeground}
                  />
                  <Text className="text-caption text-muted-foreground">
                    {label}
                  </Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 8,
  },
  circle: {
    position: "absolute",
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: colors.primary,
  },
});
