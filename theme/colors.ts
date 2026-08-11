/**
 * Color tokens from the Lingua design system (prompt_material/01-design-system.png).
 * Mirrors the CSS variables registered in global.css — keep both in sync.
 */
export const colors = {
  // Brand / primary
  primary: "#6C4EF5", // Lingua Purple
  primaryDeep: "#5B3BF6", // Lingua Deep Purple
  blue: "#4D8BFF", // Lingua Blue
  green: "#21C16B", // Lingua Green

  // Semantic
  success: "#21C16B",
  warning: "#FFC800",
  streak: "#FF8A00",
  error: "#FF4D4F",
  info: "#4D8BFF",

  // Neutrals
  foreground: "#0D132B", // Text / Primary
  mutedForeground: "#6B7280", // Text / Secondary
  border: "#E5E7EB",
  surface: "#F6F7FB",
  background: "#FFFFFF",
} as const;

export type ColorToken = keyof typeof colors;
