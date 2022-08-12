/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#635FC7",
        "primary-hover":"#A8A4FF"
      },
    },
    fontFamily: {
      jakarta: ["Plus Jakarta Sans", "sans serif"],
    },
  },
  //plugins: [require("@tailwindcss/forms")],
};
