// Maps font_style values to Tailwind font classes
// soft → Covered By Your Grace or Over the Rainbow
// raw → Reenie Beanie or Nothing You Could Do
// bold → Permanent Marker
// matter → Courier New

const STYLE_FONTS: Record<string, string[]> = {
  soft: ["font-hand-4", "font-hand-5"],
  raw: ["font-hand-2", "font-hand-3"],
  bold: ["font-hand-1"],
  matter: ["font-hand-6"],
};

const ALL_FONTS = ["font-hand-1", "font-hand-2", "font-hand-3", "font-hand-4", "font-hand-5", "font-hand-6"];

export function getFontClass(fontStyle?: string | null): string {
  if (!fontStyle || !STYLE_FONTS[fontStyle]) {
    // Fallback: random from all fonts (for old entries without font_style)
    return ALL_FONTS[Math.floor(Math.random() * ALL_FONTS.length)];
  }
  const options = STYLE_FONTS[fontStyle];
  return options[Math.floor(Math.random() * options.length)];
}
