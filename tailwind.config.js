/**
 * @type {import('tailwindcss').Config}
 */

module.exports = {
  content: [
    "./pages/**/*.{jsx,tsx}",
    "./components/**/*.{jsx,tsx}",
    "./layouts/**/*.{jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
