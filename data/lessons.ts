import type { Lesson } from "@/types/learning";

export const lessons: Lesson[] = [
  // ---------- Spanish: Basics 1 ----------
  {
    id: "es-u1-l1",
    languageId: "es",
    unitId: "es-u1",
    title: "Say Hello",
    goal: "Learn how to greet people and say goodbye in Spanish.",
    order: 1,
    xpReward: 10,
    vocabulary: [
      { id: "es-v1", word: "Hola", translation: "Hello", pronunciation: "OH-lah" },
      { id: "es-v2", word: "Adiós", translation: "Goodbye", pronunciation: "ah-dee-OHS" },
      { id: "es-v3", word: "Buenos días", translation: "Good morning", pronunciation: "BWEH-nos DEE-as" },
      { id: "es-v4", word: "Gracias", translation: "Thank you", pronunciation: "GRAH-see-as" },
      { id: "es-v5", word: "Por favor", translation: "Please", pronunciation: "por fah-VOR" },
    ],
    phrases: [
      { id: "es-p1", text: "¿Cómo estás?", translation: "How are you?", pronunciation: "KOH-moh es-TAHS" },
      { id: "es-p2", text: "Estoy bien, gracias.", translation: "I'm fine, thank you.", pronunciation: "es-TOY bee-EN, GRAH-see-as" },
    ],
    activities: [
      { id: "es-a1", type: "vocabulary", prompt: "Match the Spanish word to its translation.", vocabularyId: "es-v1" },
      { id: "es-a2", type: "listening", prompt: "Listen and repeat: Hola", vocabularyId: "es-v1" },
      { id: "es-a3", type: "phrase", prompt: "How would you ask someone how they are?", phraseId: "es-p1" },
      { id: "es-a4", type: "quiz", prompt: "Choose the correct translation for 'Gracias'.", vocabularyId: "es-v4" },
    ],
    aiTeacher: {
      systemPrompt:
        "You are Sofia, a warm and encouraging Spanish teacher for absolute beginners. Speak mostly in English, introducing Spanish words slowly and clearly. Correct mistakes gently and celebrate small wins.",
      greeting: "¡Hola! I'm Sofia. Today we'll learn how to greet people in Spanish. Ready?",
      focusAreas: ["greetings", "pronunciation", "basic courtesy"],
    },
  },
  {
    id: "es-u1-l2",
    languageId: "es",
    unitId: "es-u1",
    title: "Meeting People",
    goal: "Introduce yourself and ask someone their name.",
    order: 2,
    xpReward: 10,
    vocabulary: [
      { id: "es-v6", word: "Nombre", translation: "Name", pronunciation: "NOM-breh" },
      { id: "es-v7", word: "Mucho gusto", translation: "Nice to meet you", pronunciation: "MOO-cho GOOS-toh" },
      { id: "es-v8", word: "Soy de", translation: "I am from", pronunciation: "soy deh" },
    ],
    phrases: [
      { id: "es-p3", text: "Me llamo Ana.", translation: "My name is Ana.", pronunciation: "meh YAH-moh AH-nah" },
      { id: "es-p4", text: "¿De dónde eres?", translation: "Where are you from?", pronunciation: "deh DON-deh EH-res" },
    ],
    activities: [
      { id: "es-a5", type: "vocabulary", prompt: "Match the Spanish word to its translation.", vocabularyId: "es-v6" },
      { id: "es-a6", type: "phrase", prompt: "Introduce yourself using 'Me llamo...'.", phraseId: "es-p3" },
      { id: "es-a7", type: "quiz", prompt: "Choose the correct translation for 'Mucho gusto'.", vocabularyId: "es-v7" },
    ],
    aiTeacher: {
      systemPrompt:
        "You are Sofia, a warm and encouraging Spanish teacher for absolute beginners. Help the student practice introducing themselves and asking simple questions about others.",
      greeting: "¡Bienvenido de nuevo! Let's learn how to introduce yourself in Spanish.",
      focusAreas: ["self-introduction", "questions", "pronunciation"],
    },
  },

  // ---------- French: Basics 1 ----------
  {
    id: "fr-u1-l1",
    languageId: "fr",
    unitId: "fr-u1",
    title: "Bonjour!",
    goal: "Learn how to greet people and say goodbye in French.",
    order: 1,
    xpReward: 10,
    vocabulary: [
      { id: "fr-v1", word: "Bonjour", translation: "Hello / Good day", pronunciation: "bon-ZHOOR" },
      { id: "fr-v2", word: "Au revoir", translation: "Goodbye", pronunciation: "oh ruh-VWAHR" },
      { id: "fr-v3", word: "Merci", translation: "Thank you", pronunciation: "mehr-SEE" },
      { id: "fr-v4", word: "S'il vous plaît", translation: "Please", pronunciation: "seel voo PLEH" },
    ],
    phrases: [
      { id: "fr-p1", text: "Comment ça va?", translation: "How's it going?", pronunciation: "koh-mahn sah VAH" },
      { id: "fr-p2", text: "Ça va bien, merci.", translation: "It's going well, thanks.", pronunciation: "sah vah bee-AHN, mehr-SEE" },
    ],
    activities: [
      { id: "fr-a1", type: "vocabulary", prompt: "Match the French word to its translation.", vocabularyId: "fr-v1" },
      { id: "fr-a2", type: "listening", prompt: "Listen and repeat: Bonjour", vocabularyId: "fr-v1" },
      { id: "fr-a3", type: "phrase", prompt: "How would you ask how someone is doing?", phraseId: "fr-p1" },
    ],
    aiTeacher: {
      systemPrompt:
        "You are Marc, a friendly and patient French teacher for absolute beginners. Speak mostly in English, introducing French words slowly. Encourage the student to repeat words out loud.",
      greeting: "Bonjour! I'm Marc. Let's start with simple French greetings.",
      focusAreas: ["greetings", "pronunciation", "basic courtesy"],
    },
  },
  {
    id: "fr-u1-l2",
    languageId: "fr",
    unitId: "fr-u1",
    title: "Se Présenter",
    goal: "Introduce yourself and ask someone their name.",
    order: 2,
    xpReward: 10,
    vocabulary: [
      { id: "fr-v5", word: "Nom", translation: "Name", pronunciation: "nohm" },
      { id: "fr-v6", word: "Enchanté", translation: "Nice to meet you", pronunciation: "ahn-shahn-TAY" },
      { id: "fr-v7", word: "Je viens de", translation: "I come from", pronunciation: "zhuh vee-AHN duh" },
    ],
    phrases: [
      { id: "fr-p3", text: "Je m'appelle Marie.", translation: "My name is Marie.", pronunciation: "zhuh mah-PELL mah-REE" },
      { id: "fr-p4", text: "D'où viens-tu?", translation: "Where are you from?", pronunciation: "doo vee-AHN too" },
    ],
    activities: [
      { id: "fr-a4", type: "vocabulary", prompt: "Match the French word to its translation.", vocabularyId: "fr-v5" },
      { id: "fr-a5", type: "phrase", prompt: "Introduce yourself using 'Je m'appelle...'.", phraseId: "fr-p3" },
      { id: "fr-a6", type: "quiz", prompt: "Choose the correct translation for 'Enchanté'.", vocabularyId: "fr-v6" },
    ],
    aiTeacher: {
      systemPrompt:
        "You are Marc, a friendly and patient French teacher for absolute beginners. Help the student practice introducing themselves and asking simple questions about others.",
      greeting: "Re-bonjour! Let's learn how to introduce yourself in French.",
      focusAreas: ["self-introduction", "questions", "pronunciation"],
    },
  },

  // ---------- Japanese: Basics 1 ----------
  {
    id: "ja-u1-l1",
    languageId: "ja",
    unitId: "ja-u1",
    title: "こんにちは",
    goal: "Learn how to greet people and say goodbye in Japanese.",
    order: 1,
    xpReward: 10,
    vocabulary: [
      { id: "ja-v1", word: "こんにちは", translation: "Hello", pronunciation: "kon-nee-chee-wah" },
      { id: "ja-v2", word: "さようなら", translation: "Goodbye", pronunciation: "sah-yoh-nah-rah" },
      { id: "ja-v3", word: "ありがとう", translation: "Thank you", pronunciation: "ah-ree-gah-toh" },
      { id: "ja-v4", word: "お願いします", translation: "Please", pronunciation: "oh-neh-gai-shee-mahs" },
    ],
    phrases: [
      { id: "ja-p1", text: "お元気ですか？", translation: "How are you?", pronunciation: "oh-gen-kee dess-kah" },
      { id: "ja-p2", text: "元気です、ありがとう。", translation: "I'm fine, thank you.", pronunciation: "gen-kee dess, ah-ree-gah-toh" },
    ],
    activities: [
      { id: "ja-a1", type: "vocabulary", prompt: "Match the Japanese word to its translation.", vocabularyId: "ja-v1" },
      { id: "ja-a2", type: "listening", prompt: "Listen and repeat: こんにちは", vocabularyId: "ja-v1" },
      { id: "ja-a3", type: "phrase", prompt: "How would you ask someone how they are?", phraseId: "ja-p1" },
    ],
    aiTeacher: {
      systemPrompt:
        "You are Yuki, a warm and patient Japanese teacher for absolute beginners. Speak mostly in English, introducing Japanese words slowly with romaji pronunciation. Encourage the student to repeat words out loud.",
      greeting: "こんにちは！I'm Yuki. Let's learn some basic Japanese greetings together.",
      focusAreas: ["greetings", "pronunciation", "basic courtesy"],
    },
  },
  {
    id: "ja-u1-l2",
    languageId: "ja",
    unitId: "ja-u1",
    title: "自己紹介",
    goal: "Introduce yourself and ask someone their name.",
    order: 2,
    xpReward: 10,
    vocabulary: [
      { id: "ja-v5", word: "名前", translation: "Name", pronunciation: "nah-mah-eh" },
      { id: "ja-v6", word: "はじめまして", translation: "Nice to meet you", pronunciation: "hah-jee-meh-mah-shteh" },
      { id: "ja-v7", word: "出身", translation: "Hometown / origin", pronunciation: "shoosh-shin" },
    ],
    phrases: [
      { id: "ja-p3", text: "私の名前はミアです。", translation: "My name is Mia.", pronunciation: "wah-tah-shee no nah-mah-eh wah MEE-ah dess" },
      { id: "ja-p4", text: "出身はどこですか？", translation: "Where are you from?", pronunciation: "shoosh-shin wah doh-koh dess-kah" },
    ],
    activities: [
      { id: "ja-a4", type: "vocabulary", prompt: "Match the Japanese word to its translation.", vocabularyId: "ja-v5" },
      { id: "ja-a5", type: "phrase", prompt: "Introduce yourself using '私の名前は...です'.", phraseId: "ja-p3" },
      { id: "ja-a6", type: "quiz", prompt: "Choose the correct translation for 'はじめまして'.", vocabularyId: "ja-v6" },
    ],
    aiTeacher: {
      systemPrompt:
        "You are Yuki, a warm and patient Japanese teacher for absolute beginners. Help the student practice introducing themselves and asking simple questions about others.",
      greeting: "おかえり! Welcome back. Let's learn how to introduce yourself in Japanese.",
      focusAreas: ["self-introduction", "questions", "pronunciation"],
    },
  },
];

export function getLessonsByLanguage(languageId: string): Lesson[] {
  return lessons
    .filter((lesson) => lesson.languageId === languageId)
    .sort((a, b) => a.order - b.order);
}

export function getLessonsByUnit(unitId: string): Lesson[] {
  return lessons
    .filter((lesson) => lesson.unitId === unitId)
    .sort((a, b) => a.order - b.order);
}

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === id);
}
