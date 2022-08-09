/**
 * @type {import('tailwindcss').Config}
 */

const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{jsx,tsx}",
    "./components/**/*.{jsx,tsx}",
    "./layouts/**/*.{jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lora", ...fontFamily.sans],
        serif: ["Lustria", ...fontFamily.serif],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
