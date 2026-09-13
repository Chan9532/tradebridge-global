export type TemplateVisualTheme = {
  background: string;
  surface: string;
  text: string;
  muted: string;
  accent: string;
  accentSoft: string;
};

const themes: Record<string, TemplateVisualTheme> = {
  Expressive: { background: "#17122b", surface: "#241b43", text: "#ffffff", muted: "#c5b9e8", accent: "#9a7cff", accentSoft: "#e8e0ff" },
  Clean: { background: "#f5f8ff", surface: "#ffffff", text: "#102445", muted: "#63728c", accent: "#2368ef", accentSoft: "#dce9ff" },
  Minimal: { background: "#071b26", surface: "#0d2a39", text: "#f5fbff", muted: "#a7c3cf", accent: "#39d6c5", accentSoft: "#cef8f2" },
  Editorial: { background: "#f6f0e5", surface: "#fffaf1", text: "#33291e", muted: "#74695d", accent: "#c45c32", accentSoft: "#f3d8c9" },
  Modern: { background: "#22121c", surface: "#351928", text: "#fff7fb", muted: "#ddb9cb", accent: "#ff6ba8", accentSoft: "#ffd9e9" },
  Warm: { background: "#f3fbf5", surface: "#ffffff", text: "#173424", muted: "#64796b", accent: "#2c9a62", accentSoft: "#d7f3e2" },
  Calm: { background: "#eff8fa", surface: "#ffffff", text: "#133541", muted: "#668089", accent: "#238ba0", accentSoft: "#d2f0f4" },
  Premium: { background: "#111820", surface: "#1a2530", text: "#f9f4e8", muted: "#bfc3c4", accent: "#d0aa5b", accentSoft: "#f4e8c8" },
  Bold: { background: "#fff2e8", surface: "#ffffff", text: "#35190f", muted: "#805f52", accent: "#f15b2a", accentSoft: "#ffd9c8" },
};

const fallbackTheme: TemplateVisualTheme = { background: "#f5f8ff", surface: "#ffffff", text: "#102445", muted: "#63728c", accent: "#2368ef", accentSoft: "#dce9ff" };

export function getTemplateVisualTheme(style: string) {
  return themes[style] ?? fallbackTheme;
}
