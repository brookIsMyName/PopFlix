const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // adjust if you're not using Vite
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});