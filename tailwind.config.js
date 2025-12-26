
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./index.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#ec6d13",
        "background-light": "#f8f7f6",
        "background-dark": "#1a120b",
        "card-light": "#ffffff",
        "card-dark": "#2c2016",
      },
      fontFamily: {
        "display": ["Plus Jakarta Sans", "sans-serif"]
      }
    },
  },
  plugins: [],
}
