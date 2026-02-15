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
        "hand-1": ['"Permanent Marker"', "cursive"],
        "hand-2": ['"Reenie Beanie"', "cursive"],
        "hand-3": ['"Nothing You Could Do"', "cursive"],
        "hand-4": ['"Covered By Your Grace"', "cursive"],
        "hand-5": ['"Over the Rainbow"', "cursive"],
      },
    },
  },
  plugins: [],
};
