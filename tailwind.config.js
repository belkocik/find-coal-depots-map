/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nav: "#e8dbc9",
        navHover: "#c8ac86",
        span: "#361b17",
        table1: "#faf2e8",
        table2: "#e8dbc9",
      },
    },
  },
  plugins: [],
};
