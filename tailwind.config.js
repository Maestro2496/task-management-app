/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#635FC7",
        "primary-hover": "#A8A4FF",
        "dark-grey": "#2B2C37",
        "very-dark-grey": "#20212C",
        "lines-dark": "#3E3F4E",
        "medium-grey": "#828FA3",
      },
    },
    fontFamily: {
      jakarta: ["Plus Jakarta Sans", "sans serif"],
    },
  },
  darkMode: "class",
  //plugins: [require("@tailwindcss/forms")],
};
