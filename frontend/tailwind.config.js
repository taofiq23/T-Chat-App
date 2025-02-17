import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {backdropBlur: {
      xs: "2px",
    },
    backgroundImage: {
      glass: "linear-gradient(to bottom right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
    },},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "light", "dark", "emerald", "synthwave", "retro", "black", "luxury", "dracula", "business", "lemonade", "winter", "dim"
    ],
  },
};