Read AGENTS.md first and follow it strictly.

Implement the language selection screen UI based on the attached design. Use the hardcoded languages from `data/languages.ts` and the existing NativeWind/global.css design utilities.

Replace "See all languages" with confirmation button and use the earth image from the assets folder properly.

Add a link on the home screen route (/) to navigate to the language selection screen route.

Keep the confirmation button disabled until a language is selected. If there is no selection, it must remain disabled and perform neither persistence nor navigation. When confirmed, persist the selected language ID through the shared language store, then navigate to the intended route.

[alt text](../prompt_material/04-language-selection-screen.png)
