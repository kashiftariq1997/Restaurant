/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      padding: "1rem",
      screens: {
        md: "1180px",
        lg: "1280px",
      },
    },
    extend: {
      colors: {
        primary: "#ff006b",
        secondary: "#f253aa",
        secondaryVariant: "#ff3e8b",
        blue: "#008bba",
        blueVariant: "#567dff",
        lightBlue: "#DCEAFF",
        lightGray: "#6e7191",
        dark: "#1f1f39",
        orange: "#fb4e4e",
        green: "#1ab759",
        yellow: "#F6A609",
        purple: "#a953ff",
        lightPurple: "#8262fe",
      },
      boxShadow: {
        hard: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      },
      fontFamily: {
        rubik: ['"Rubik"', "sans-serif"],
        publicSans: ['"Public Sans"', "sans-serif"],
        elMessiri: ['"El Messiri"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
