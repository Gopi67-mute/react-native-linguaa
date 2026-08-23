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
    image: "https://picsum.photos/seed/es-u1-l1/800/600",
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
    image: "https://picsum.photos/seed/es-u1-l2/800/600",
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

  {
    id: "es-u1-l3",
    languageId: "es",
    unitId: "es-u1",
    title: "At the Café",
    goal: "Order food and drinks at a café.",
    order: 3,
    xpReward: 10,
    image: "https://picsum.photos/seed/es-u1-l3/800/600",
    vocabulary: [
      { id: "es-v9", word: "Café", translation: "Coffee", pronunciation: "kah-FEH" },
      { id: "es-v10", word: "Agua", translation: "Water", pronunciation: "AH-gwah" },
      { id: "es-v11", word: "La cuenta", translation: "The bill", pronunciation: "lah KWEN-tah" },
    ],
    phrases: [
      { id: "es-p5", text: "¿Qué desea pedir?", translation: "What would you like to order?", pronunciation: "keh deh-SEH-ah peh-DEER" },
      { id: "es-p6", text: "Quisiera un café, por favor.", translation: "I would like a coffee, please.", pronunciation: "kee-see-EH-rah oon kah-FEH, por fah-VOR" },
    ],
    activities: [
      { id: "es-a8", type: "vocabulary", prompt: "Match the Spanish word to its translation.", vocabularyId: "es-v9" },
      { id: "es-a9", type: "phrase", prompt: "Order a coffee using 'Quisiera...'.", phraseId: "es-p6" },
      { id: "es-a10", type: "quiz", prompt: "Choose the correct translation for 'La cuenta'.", vocabularyId: "es-v11" },
    ],
    aiTeacher: {
      systemPrompt:
        "You are Sofia, a warm and encouraging Spanish teacher for absolute beginners. Help the student practice ordering food and drinks at a café.",
      greeting: "¡Bienvenido al café! Let's learn how to order something to eat and drink.",
      focusAreas: ["ordering food", "café vocabulary", "pronunciation"],
    },
  },
  {
    id: "es-u1-l4",
    languageId: "es",
    unitId: "es-u1",
    title: "Travel & Directions",
    goal: "Ask for and understand basic directions.",
    order: 4,
    xpReward: 10,
    image: "https://picsum.photos/seed/es-u1-l4/800/600",
    vocabulary: [
      { id: "es-v12", word: "Izquierda", translation: "Left", pronunciation: "ees-kee-EHR-dah" },
      { id: "es-v13", word: "Derecha", translation: "Right", pronunciation: "deh-REH-chah" },
      { id: "es-v14", word: "La estación", translation: "The station", pronunciation: "lah es-tah-see-OHN" },
    ],
    phrases: [
      { id: "es-p7", text: "¿Dónde está la estación?", translation: "Where is the station?", pronunciation: "DON-deh es-TAH lah es-tah-see-OHN" },
      { id: "es-p8", text: "Siga derecho.", translation: "Go straight ahead.", pronunciation: "SEE-gah deh-REH-cho" },
    ],
    activities: [
      { id: "es-a11", type: "vocabulary", prompt: "Match the Spanish word to its translation.", vocabularyId: "es-v12" },
      { id: "es-a12", type: "phrase", prompt: "Ask where the station is.", phraseId: "es-p7" },
      { id: "es-a13", type: "quiz", prompt: "Choose the correct translation for 'Derecha'.", vocabularyId: "es-v13" },
    ],
    aiTeacher: {
      systemPrompt:
        "You are Sofia, a warm and encouraging Spanish teacher for absolute beginners. Help the student practice asking for and following directions.",
      greeting: "¡Vamos a explorar! Let's learn how to ask for directions in Spanish.",
      focusAreas: ["directions", "travel vocabulary", "pronunciation"],
    },
  },
  {
    id: "es-u1-l5",
    languageId: "es",
    unitId: "es-u1",
    title: "Shopping",
    goal: "Ask about prices and sizes while shopping.",
    order: 5,
    xpReward: 10,
    image: "https://picsum.photos/seed/es-u1-l5/800/600",
    vocabulary: [
      { id: "es-v15", word: "Tienda", translation: "Store", pronunciation: "tee-EN-dah" },
      { id: "es-v16", word: "Precio", translation: "Price", pronunciation: "PREH-see-oh" },
      { id: "es-v17", word: "Talla", translation: "Size", pronunciation: "TAH-yah" },
    ],
    phrases: [
      { id: "es-p9", text: "¿Cuánto cuesta esto?", translation: "How much does this cost?", pronunciation: "KWAN-toh KWES-tah ES-toh" },
      { id: "es-p10", text: "¿Tiene otra talla?", translation: "Do you have another size?", pronunciation: "tee-EH-neh OH-trah TAH-yah" },
    ],
    activities: [
      { id: "es-a14", type: "vocabulary", prompt: "Match the Spanish word to its translation.", vocabularyId: "es-v15" },
      { id: "es-a15", type: "phrase", prompt: "Ask how much something costs.", phraseId: "es-p9" },
      { id: "es-a16", type: "quiz", prompt: "Choose the correct translation for 'Talla'.", vocabularyId: "es-v17" },
    ],
    aiTeacher: {
      systemPrompt:
        "You are Sofia, a warm and encouraging Spanish teacher for absolute beginners. Help the student practice shopping phrases like prices and sizes.",
      greeting: "¡Vamos de compras! Let's learn how to shop in Spanish.",
      focusAreas: ["shopping", "numbers", "pronunciation"],
    },
  },
  {
    id: "es-u1-l6",
    languageId: "es",
    unitId: "es-u1",
    title: "Family & Friends",
    goal: "Talk about your family and friends.",
    order: 6,
    xpReward: 10,
    image: "https://picsum.photos/seed/es-u1-l6/800/600",
    vocabulary: [
      { id: "es-v18", word: "Familia", translation: "Family", pronunciation: "fah-MEE-lee-ah" },
      { id: "es-v19", word: "Hermano", translation: "Brother", pronunciation: "ehr-MAH-noh" },
      { id: "es-v20", word: "Amigo", translation: "Friend", pronunciation: "ah-MEE-goh" },
    ],
    phrases: [
      { id: "es-p11", text: "Esta es mi familia.", translation: "This is my family.", pronunciation: "ES-tah es mee fah-MEE-lee-ah" },
      { id: "es-p12", text: "Él es mi amigo.", translation: "He is my friend.", pronunciation: "el es mee ah-MEE-goh" },
    ],
    activities: [
      { id: "es-a17", type: "vocabulary", prompt: "Match the Spanish word to its translation.", vocabularyId: "es-v18" },
      { id: "es-a18", type: "phrase", prompt: "Introduce a family member using 'Esta es...'.", phraseId: "es-p11" },
      { id: "es-a19", type: "quiz", prompt: "Choose the correct translation for 'Amigo'.", vocabularyId: "es-v20" },
    ],
    aiTeacher: {
      systemPrompt:
        "You are Sofia, a warm and encouraging Spanish teacher for absolute beginners. Help the student practice talking about family and friends.",
      greeting: "¡Hablemos de tu familia! Let's learn how to talk about family and friends.",
      focusAreas: ["family", "friends", "pronunciation"],
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
    image: "https://picsum.photos/seed/fr-u1-l1/800/600",
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
    image: "https://picsum.photos/seed/fr-u1-l2/800/600",
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

  {
    id: "fr-u1-l3",
    languageId: "fr",
    unitId: "fr-u1",
    title: "Au Café",
    goal: "Order food and drinks at a café.",
    order: 3,
    xpReward: 10,
    image: "https://picsum.photos/seed/fr-u1-l3/800/600",
    vocabulary: [
      { id: "fr-v8", word: "Café", translation: "Coffee", pronunciation: "kah-FAY" },
      { id: "fr-v9", word: "Eau", translation: "Water", pronunciation: "oh" },
      { id: "fr-v10", word: "L'addition", translation: "The bill", pronunciation: "lah-dee-see-OHN" },
    ],
    phrases: [
      { id: "fr-p5", text: "Je voudrais un café, s'il vous plaît.", translation: "I would like a coffee, please.", pronunciation: "zhuh voo-DRAY uhn kah-FAY, seel voo PLEH" },
      { id: "fr-p6", text: "L'addition, s'il vous plaît.", translation: "The bill, please.", pronunciation: "lah-dee-see-OHN, seel voo PLEH" },
    ],
    activities: [
      { id: "fr-a7", type: "vocabulary", prompt: "Match the French word to its translation.", vocabularyId: "fr-v8" },
      { id: "fr-a8", type: "phrase", prompt: "Order a coffee using 'Je voudrais...'.", phraseId: "fr-p5" },
      { id: "fr-a9", type: "quiz", prompt: "Choose the correct translation for 'L'addition'.", vocabularyId: "fr-v10" },
    ],
    aiTeacher: {
      systemPrompt:
        "You are Marc, a friendly and patient French teacher for absolute beginners. Help the student practice ordering food and drinks at a café.",
      greeting: "Bienvenue au café! Let's learn how to order something to eat and drink.",
      focusAreas: ["ordering food", "café vocabulary", "pronunciation"],
    },
  },
  {
    id: "fr-u1-l4",
    languageId: "fr",
    unitId: "fr-u1",
    title: "Voyages et Directions",
    goal: "Ask for and understand basic directions.",
    order: 4,
    xpReward: 10,
    image: "https://picsum.photos/seed/fr-u1-l4/800/600",
    vocabulary: [
      { id: "fr-v11", word: "Gauche", translation: "Left", pronunciation: "gohsh" },
      { id: "fr-v12", word: "Droite", translation: "Right", pronunciation: "drwaht" },
      { id: "fr-v13", word: "La gare", translation: "The station", pronunciation: "lah gahr" },
    ],
    phrases: [
      { id: "fr-p7", text: "Où est la gare?", translation: "Where is the station?", pronunciation: "oo eh lah gahr" },
      { id: "fr-p8", text: "Allez tout droit.", translation: "Go straight ahead.", pronunciation: "ah-lay too drwah" },
    ],
    activities: [
      { id: "fr-a10", type: "vocabulary", prompt: "Match the French word to its translation.", vocabularyId: "fr-v11" },
      { id: "fr-a11", type: "phrase", prompt: "Ask where the station is.", phraseId: "fr-p7" },
      { id: "fr-a12", type: "quiz", prompt: "Choose the correct translation for 'Droite'.", vocabularyId: "fr-v12" },
    ],
    aiTeacher: {
      systemPrompt:
        "You are Marc, a friendly and patient French teacher for absolute beginners. Help the student practice asking for and following directions.",
      greeting: "Allons explorer! Let's learn how to ask for directions in French.",
      focusAreas: ["directions", "travel vocabulary", "pronunciation"],
    },
  },
  {
    id: "fr-u1-l5",
    languageId: "fr",
    unitId: "fr-u1",
    title: "Faire les Courses",
    goal: "Ask about prices and sizes while shopping.",
    order: 5,
    xpReward: 10,
    image: "https://picsum.photos/seed/fr-u1-l5/800/600",
    vocabulary: [
      { id: "fr-v14", word: "Magasin", translation: "Store", pronunciation: "mah-gah-ZAN" },
      { id: "fr-v15", word: "Prix", translation: "Price", pronunciation: "pree" },
      { id: "fr-v16", word: "Taille", translation: "Size", pronunciation: "tie" },
    ],
    phrases: [
      { id: "fr-p9", text: "Combien ça coûte?", translation: "How much does this cost?", pronunciation: "kohm-bee-AN sah koot" },
      { id: "fr-p10", text: "Avez-vous une autre taille?", translation: "Do you have another size?", pronunciation: "ah-vay voo oon OH-truh tie" },
    ],
    activities: [
      { id: "fr-a13", type: "vocabulary", prompt: "Match the French word to its translation.", vocabularyId: "fr-v14" },
      { id: "fr-a14", type: "phrase", prompt: "Ask how much something costs.", phraseId: "fr-p9" },
      { id: "fr-a15", type: "quiz", prompt: "Choose the correct translation for 'Taille'.", vocabularyId: "fr-v16" },
    ],
    aiTeacher: {
      systemPrompt:
        "You are Marc, a friendly and patient French teacher for absolute beginners. Help the student practice shopping phrases like prices and sizes.",
      greeting: "Allons faire les courses! Let's learn how to shop in French.",
      focusAreas: ["shopping", "numbers", "pronunciation"],
    },
  },
  {
    id: "fr-u1-l6",
    languageId: "fr",
    unitId: "fr-u1",
    title: "Famille et Amis",
    goal: "Talk about your family and friends.",
    order: 6,
    xpReward: 10,
    image: "https://picsum.photos/seed/fr-u1-l6/800/600",
    vocabulary: [
      { id: "fr-v17", word: "Famille", translation: "Family", pronunciation: "fah-MEE-yuh" },
      { id: "fr-v18", word: "Frère", translation: "Brother", pronunciation: "frehr" },
      { id: "fr-v19", word: "Ami", translation: "Friend", pronunciation: "ah-MEE" },
    ],
    phrases: [
      { id: "fr-p11", text: "Voici ma famille.", translation: "This is my family.", pronunciation: "vwah-see mah fah-MEE-yuh" },
      { id: "fr-p12", text: "Il est mon ami.", translation: "He is my friend.", pronunciation: "eel eh mohn ah-MEE" },
    ],
    activities: [
      { id: "fr-a16", type: "vocabulary", prompt: "Match the French word to its translation.", vocabularyId: "fr-v17" },
      { id: "fr-a17", type: "phrase", prompt: "Introduce a family member using 'Voici...'.", phraseId: "fr-p11" },
      { id: "fr-a18", type: "quiz", prompt: "Choose the correct translation for 'Ami'.", vocabularyId: "fr-v19" },
    ],
    aiTeacher: {
      systemPrompt:
        "You are Marc, a friendly and patient French teacher for absolute beginners. Help the student practice talking about family and friends.",
      greeting: "Parlons de ta famille! Let's learn how to talk about family and friends.",
      focusAreas: ["family", "friends", "pronunciation"],
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
    image: "https://picsum.photos/seed/ja-u1-l1/800/600",
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
    image: "https://picsum.photos/seed/ja-u1-l2/800/600",
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
  {
    id: "ja-u1-l3",
    languageId: "ja",
    unitId: "ja-u1",
    title: "カフェで",
    goal: "Order food and drinks at a café.",
    order: 3,
    xpReward: 10,
    image: "https://picsum.photos/seed/ja-u1-l3/800/600",
    vocabulary: [
      { id: "ja-v8", word: "コーヒー", translation: "Coffee", pronunciation: "koh-hee" },
      { id: "ja-v9", word: "水", translation: "Water", pronunciation: "mee-zoo" },
      { id: "ja-v10", word: "お会計", translation: "The bill", pronunciation: "oh-kai-kay" },
    ],
    phrases: [
      { id: "ja-p5", text: "コーヒーをください。", translation: "Coffee, please.", pronunciation: "koh-hee oh koo-dah-sai" },
      { id: "ja-p6", text: "お会計をお願いします。", translation: "The bill, please.", pronunciation: "oh-kai-kay oh oh-neh-gai-shee-mahs" },
    ],
    activities: [
      { id: "ja-a7", type: "vocabulary", prompt: "Match the Japanese word to its translation.", vocabularyId: "ja-v8" },
      { id: "ja-a8", type: "phrase", prompt: "Order a coffee using 'をください'.", phraseId: "ja-p5" },
      { id: "ja-a9", type: "quiz", prompt: "Choose the correct translation for 'お会計'.", vocabularyId: "ja-v10" },
    ],
    aiTeacher: {
      systemPrompt:
        "You are Yuki, a warm and patient Japanese teacher for absolute beginners. Help the student practice ordering food and drinks at a café.",
      greeting: "カフェへようこそ！Let's learn how to order something to eat and drink.",
      focusAreas: ["ordering food", "café vocabulary", "pronunciation"],
    },
  },
  {
    id: "ja-u1-l4",
    languageId: "ja",
    unitId: "ja-u1",
    title: "旅行と道案内",
    goal: "Ask for and understand basic directions.",
    order: 4,
    xpReward: 10,
    image: "https://picsum.photos/seed/ja-u1-l4/800/600",
    vocabulary: [
      { id: "ja-v11", word: "左", translation: "Left", pronunciation: "hee-dah-ree" },
      { id: "ja-v12", word: "右", translation: "Right", pronunciation: "mee-gee" },
      { id: "ja-v13", word: "駅", translation: "Station", pronunciation: "eh-kee" },
    ],
    phrases: [
      { id: "ja-p7", text: "駅はどこですか？", translation: "Where is the station?", pronunciation: "eh-kee wah doh-koh dess-kah" },
      { id: "ja-p8", text: "まっすぐ行ってください。", translation: "Go straight ahead.", pronunciation: "mahs-soo-goo it-teh koo-dah-sai" },
    ],
    activities: [
      { id: "ja-a10", type: "vocabulary", prompt: "Match the Japanese word to its translation.", vocabularyId: "ja-v11" },
      { id: "ja-a11", type: "phrase", prompt: "Ask where the station is.", phraseId: "ja-p7" },
      { id: "ja-a12", type: "quiz", prompt: "Choose the correct translation for '右'.", vocabularyId: "ja-v12" },
    ],
    aiTeacher: {
      systemPrompt:
        "You are Yuki, a warm and patient Japanese teacher for absolute beginners. Help the student practice asking for and following directions.",
      greeting: "探検に行きましょう！Let's learn how to ask for directions in Japanese.",
      focusAreas: ["directions", "travel vocabulary", "pronunciation"],
    },
  },
  {
    id: "ja-u1-l5",
    languageId: "ja",
    unitId: "ja-u1",
    title: "買い物",
    goal: "Ask about prices and sizes while shopping.",
    order: 5,
    xpReward: 10,
    image: "https://picsum.photos/seed/ja-u1-l5/800/600",
    vocabulary: [
      { id: "ja-v14", word: "店", translation: "Store", pronunciation: "mee-seh" },
      { id: "ja-v15", word: "値段", translation: "Price", pronunciation: "neh-dahn" },
      { id: "ja-v16", word: "サイズ", translation: "Size", pronunciation: "sai-zoo" },
    ],
    phrases: [
      { id: "ja-p9", text: "これはいくらですか？", translation: "How much is this?", pronunciation: "koh-reh wah ee-koo-rah dess-kah" },
      { id: "ja-p10", text: "他のサイズはありますか？", translation: "Do you have another size?", pronunciation: "hoh-kah noh sai-zoo wah ah-ree-mahs-kah" },
    ],
    activities: [
      { id: "ja-a13", type: "vocabulary", prompt: "Match the Japanese word to its translation.", vocabularyId: "ja-v14" },
      { id: "ja-a14", type: "phrase", prompt: "Ask how much something costs.", phraseId: "ja-p9" },
      { id: "ja-a15", type: "quiz", prompt: "Choose the correct translation for 'サイズ'.", vocabularyId: "ja-v16" },
    ],
    aiTeacher: {
      systemPrompt:
        "You are Yuki, a warm and patient Japanese teacher for absolute beginners. Help the student practice shopping phrases like prices and sizes.",
      greeting: "買い物に行きましょう！Let's learn how to shop in Japanese.",
      focusAreas: ["shopping", "numbers", "pronunciation"],
    },
  },
  {
    id: "ja-u1-l6",
    languageId: "ja",
    unitId: "ja-u1",
    title: "家族と友達",
    goal: "Talk about your family and friends.",
    order: 6,
    xpReward: 10,
    image: "https://picsum.photos/seed/ja-u1-l6/800/600",
    vocabulary: [
      { id: "ja-v17", word: "家族", translation: "Family", pronunciation: "kah-zoh-koo" },
      { id: "ja-v18", word: "兄弟", translation: "Sibling", pronunciation: "kyoh-dai" },
      { id: "ja-v19", word: "友達", translation: "Friend", pronunciation: "toh-moh-dah-chee" },
    ],
    phrases: [
      { id: "ja-p11", text: "これは私の家族です。", translation: "This is my family.", pronunciation: "koh-reh wah wah-tah-shee noh kah-zoh-koo dess" },
      { id: "ja-p12", text: "彼は私の友達です。", translation: "He is my friend.", pronunciation: "kah-reh wah wah-tah-shee noh toh-moh-dah-chee dess" },
    ],
    activities: [
      { id: "ja-a16", type: "vocabulary", prompt: "Match the Japanese word to its translation.", vocabularyId: "ja-v17" },
      { id: "ja-a17", type: "phrase", prompt: "Introduce a family member using 'これは私の...です'.", phraseId: "ja-p11" },
      { id: "ja-a18", type: "quiz", prompt: "Choose the correct translation for '友達'.", vocabularyId: "ja-v19" },
    ],
    aiTeacher: {
      systemPrompt:
        "You are Yuki, a warm and patient Japanese teacher for absolute beginners. Help the student practice talking about family and friends.",
      greeting: "家族の話をしましょう！Let's learn how to talk about family and friends.",
      focusAreas: ["family", "friends", "pronunciation"],
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
