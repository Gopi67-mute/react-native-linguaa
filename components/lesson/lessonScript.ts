import { colors } from "@/theme";
import type { Lesson } from "@/types/learning";

// Drives the mocked AI teacher conversation for the audio lesson screen.
// There is no real speech/AI backend yet (see AGENTS.md AI/Vision Agent rules) —
// this just scripts a believable turn-by-turn flow from the lesson's own content.

export type StepKind = "greeting" | "prompt" | "praise" | "complete";

export interface ScriptStep {
  kind: StepKind;
  line: string;
  caption?: string;
}

const PRAISE_LINES = [
  "Nice work! 👏",
  "That was great! 🎉",
  "Excellent! ⭐",
  "You're on a roll! 🔥",
];

export function buildLessonScript(lesson: Lesson): ScriptStep[] {
  const steps: ScriptStep[] = [
    { kind: "greeting", line: lesson.aiTeacher.greeting },
  ];

  lesson.phrases.forEach((phrase, index) => {
    steps.push({
      kind: "prompt",
      line: phrase.text,
      caption: `Try saying: "${phrase.translation}"`,
    });
    steps.push({
      kind: "praise",
      line: phrase.text,
      caption: `${PRAISE_LINES[index % PRAISE_LINES.length]} "${phrase.translation}"`,
    });
  });

  steps.push({
    kind: "complete",
    line: "Lesson complete!",
    caption: `Great work on "${lesson.title}" 🎉`,
  });

  return steps;
}

export interface SessionRatings {
  speaking: string;
  pronunciation: string;
  grammar: string;
}

const RATING_PROGRESSION: SessionRatings[] = [
  { speaking: "Good", pronunciation: "Good", grammar: "Fair" },
  { speaking: "Great", pronunciation: "Good", grammar: "Good" },
  { speaking: "Great", pronunciation: "Great", grammar: "Good" },
  { speaking: "Excellent", pronunciation: "Great", grammar: "Good" },
];

export function getRatingsForPraiseCount(
  praiseCount: number,
): SessionRatings | null {
  if (praiseCount <= 0) return null;
  const index = Math.min(praiseCount - 1, RATING_PROGRESSION.length - 1);
  return RATING_PROGRESSION[index];
}

export function ratingColor(label: string): string {
  switch (label) {
    case "Excellent":
      return colors.green;
    case "Great":
      return colors.primary;
    case "Good":
      return colors.blue;
    default:
      return colors.mutedForeground;
  }
}
