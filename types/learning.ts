// Core types for the hardcoded learning content system.
// Content lives in data/languages.ts, data/units.ts, and data/lessons.ts.

export type LanguageId = "es" | "fr" | "ja";

export interface Language {
  id: LanguageId;
  name: string;
  nativeName: string;
  flagEmoji: string;
  learners: string;
  popular: boolean;
}

export interface Unit {
  id: string;
  languageId: LanguageId;
  title: string;
  description: string;
  order: number;
  color: string;
  image?: string;
}

export interface VocabularyItem {
  id: string;
  word: string;
  translation: string;
  pronunciation?: string;
}

export interface Phrase {
  id: string;
  text: string;
  translation: string;
  pronunciation?: string;
}

export type ActivityType = "vocabulary" | "phrase" | "listening" | "quiz";

export interface Activity {
  id: string;
  type: ActivityType;
  prompt: string;
  vocabularyId?: string;
  phraseId?: string;
}

// Context handed to the future audio/video AI teacher (Vision Agent) session.
export interface AITeacherPrompt {
  systemPrompt: string;
  greeting: string;
  focusAreas: string[];
}

export interface Lesson {
  id: string;
  languageId: LanguageId;
  unitId: string;
  title: string;
  goal: string;
  order: number;
  xpReward: number;
  image?: string;
  vocabulary: VocabularyItem[];
  phrases: Phrase[];
  activities: Activity[];
  aiTeacher: AITeacherPrompt;
}
