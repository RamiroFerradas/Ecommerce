/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Jost", "sans-serif"],
        handwriting: ["Caveat", "cursive"],
      },
    },
    backdropBlur: {
      xs: "2px",
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
});
