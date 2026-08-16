import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { GradientButton } from "@/components/auth/GradientButton";
import { LanguageCard } from "@/components/language/LanguageCard";
import { images } from "@/constants/images";
import { languages } from "@/data/languages";
import { colors } from "@/theme";
import type { LanguageId } from "@/types/learning";

export default function LanguageSelection() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<LanguageId>(languages[0].id);

  const isSearching = query.trim().length > 0;

  const filteredLanguages = useMemo(() => {
    if (!isSearching) {
      return languages.filter((language) => language.popular);
    }

    const normalizedQuery = query.trim().toLowerCase();
    return languages.filter(
      (language) =>
        language.name.toLowerCase().includes(normalizedQuery) ||
        language.nativeName.toLowerCase().includes(normalizedQuery),
    );
  }, [isSearching, query]);

  const handleConfirm = () => {
    router.replace("/");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View className="flex-1 px-6">
        <View className="flex-row items-center justify-between py-2">
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 items-start justify-center"
            hitSlop={8}
          >
            <Ionicons name="chevron-back" size={26} color={colors.foreground} />
          </Pressable>
          <Text className="text-h3 text-foreground">Choose a language</Text>
          <View className="w-10" />
        </View>

        <View className="flex-row items-center gap-2 bg-surface rounded-full px-4 py-3 mt-4">
          <Ionicons
            name="search-outline"
            size={20}
            color={colors.mutedForeground}
          />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search languages"
            placeholderTextColor={colors.mutedForeground}
            className="flex-1 text-body-md text-foreground"
          />
        </View>

        {!isSearching && (
          <Text className="text-h4 text-foreground mt-6 mb-3">Popular</Text>
        )}

        <FlatList
          data={filteredLanguages}
          keyExtractor={(language) => language.id}
          showsVerticalScrollIndicator={false}
          className="flex-3"
          contentContainerStyle={{
            paddingTop: isSearching ? 24 : 0,
            paddingBottom: 12,
          }}
          renderItem={({ item }) => (
            <LanguageCard
              language={item}
              selected={item.id === selectedId}
              onPress={() => setSelectedId(item.id)}
            />
          )}
        />

        <GradientButton label="Continue" onPress={handleConfirm} />

        <View
          className="flex-1 mt-8 mb-4 items-center justify-center"
          pointerEvents="none"
        >
          <Image
            source={images.earth}
            resizeMode="contain"
            style={{ height: 299, width: "100%" }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
