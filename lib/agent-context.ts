import { getLanguageById } from "@/data/languages";
import { getLessonById } from "@/data/lessons";

// Server-only trust boundary: the mobile client sends only a lessonId (and
// optionally the language it thinks it's learning, checked against the
// resolved lesson below) — everything the AI teacher actually needs to teach
// is looked up here from data/lessons.ts and data/languages.ts, never taken
// from the request body. See app/api/agent/start+api.ts.
export type AgentLessonContext = {
  lessonId: string;
  lessonTitle: string;
  goal: string;
  languageCode: string;
  languageName: string;
  focusAreas: string[];
  systemPrompt: string;
  greeting: string;
  vocabulary: { word: string; translation: string; pronunciation?: string }[];
  phrases: { text: string; translation: string; pronunciation?: string }[];
};

export function resolveAgentLessonContext(
  lessonId: string,
  languageCode?: string,
): AgentLessonContext | undefined {
  const lesson = getLessonById(lessonId);
  if (!lesson) return undefined;
  if (languageCode && languageCode !== lesson.languageId) return undefined;

  const language = getLanguageById(lesson.languageId);
  if (!language) return undefined;

  return {
    lessonId: lesson.id,
    lessonTitle: lesson.title,
    goal: lesson.goal,
    languageCode: lesson.languageId,
    languageName: language.name,
    focusAreas: lesson.aiTeacher.focusAreas,
    systemPrompt: lesson.aiTeacher.systemPrompt,
    greeting: lesson.aiTeacher.greeting,
    vocabulary: lesson.vocabulary.map(({ word, translation, pronunciation }) => ({
      word,
      translation,
      pronunciation,
    })),
    phrases: lesson.phrases.map(({ text, translation, pronunciation }) => ({
      text,
      translation,
      pronunciation,
    })),
  };
}
