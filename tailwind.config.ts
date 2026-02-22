/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FAF6F1",
        warmwhite: "#FFFDF9",
        parchment: "#F5EDE3",
        coffee: "#6b6b6b",
        espresso: "#2c2c2c",
        amber: "#a0a0a0",
        softbrown: "#999999",
        blush: "#e0e0e0",
      },
      fontFamily: {
        hand: ["Caveat", "cursive"],
        body: ["Lora", "serif"],
        nav: ["Outfit", "sans-serif"],
        lab: ["Lato", "sans-serif"],
        "hand-permanent-marker": ['"Permanent Marker"', "cursive"],
        "hand-reenie-beanie": ['"Reenie Beanie"', "cursive"],
        "hand-nothing-you-could-do": ['"Nothing You Could Do"', "cursive"],
        "hand-covered-by-your-grace": ['"Covered By Your Grace"', "cursive"],
        "hand-allura": ['"Allura"', "cursive"],
        "hand-courier-new": ['"Courier New"', "monospace"],
      },
    },
  },
  plugins: [],
};
