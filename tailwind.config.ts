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
        coffee: "#8B7355",
        espresso: "#5C4A32",
        amber: "#C4956A",
        softbrown: "#B8A08A",
        blush: "#E8D5C4",
      },
      fontFamily: {
        hand: ["Caveat", "cursive"],
        body: ["Lora", "serif"],
        nav: ["Outfit", "sans-serif"],
      },
    },
  },
  plugins: [],
};
