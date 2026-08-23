import { Text, View } from "react-native";

import { ratingColor, type SessionRatings } from "./lessonScript";

type SessionFeedbackProps = {
  ratings: SessionRatings | null;
};

const METRICS: { key: keyof SessionRatings; label: string }[] = [
  { key: "speaking", label: "Speaking" },
  { key: "pronunciation", label: "Pronunciation" },
  { key: "grammar", label: "Grammar" },
];

export function SessionFeedback({ ratings }: SessionFeedbackProps) {
  return (
    <View className="mx-6 mb-4 bg-surface rounded-2xl px-4 py-4 flex-row justify-between">
      {METRICS.map((metric) => {
        const value = ratings?.[metric.key] ?? "—";
        return (
          <View key={metric.key} className="items-center flex-1">
            <Text className="text-body-sm text-foreground">{metric.label}</Text>
            <Text
              className={`text-h4 mt-1 ${ratings ? "" : "text-muted-foreground"}`}
              style={ratings ? { color: ratingColor(value) } : undefined}
            >
              {value}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
