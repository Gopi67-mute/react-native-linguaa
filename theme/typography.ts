import { fontFamily } from "./fonts";

/**
 * Type scale from the Lingua design system (prompt_material/01-design-system.png).
 * Mirrors the `text-*` utilities registered in global.css — keep both in sync.
 * For use in StyleSheet/inline-style contexts (see AGENTS.md Style Exception Rules).
 */
export const typography = {
  h1: { fontFamily: fontFamily.bold, fontSize: 32, lineHeight: 32 * 1.2 },
  h2: { fontFamily: fontFamily.semibold, fontSize: 24, lineHeight: 24 * 1.3 },
  h3: { fontFamily: fontFamily.semibold, fontSize: 20, lineHeight: 20 * 1.3 },
  h4: { fontFamily: fontFamily.medium, fontSize: 16, lineHeight: 16 * 1.4 },
  bodyLarge: { fontFamily: fontFamily.regular, fontSize: 16, lineHeight: 16 * 1.6 },
  bodyMedium: { fontFamily: fontFamily.regular, fontSize: 14, lineHeight: 14 * 1.6 },
  bodySmall: { fontFamily: fontFamily.regular, fontSize: 13, lineHeight: 13 * 1.6 },
  caption: { fontFamily: fontFamily.regular, fontSize: 11, lineHeight: 11 * 1.4 },
} as const;

export type TypographyToken = keyof typeof typography;
