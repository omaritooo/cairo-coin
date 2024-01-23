/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        dark: {
          primary: "#0077E4",
          bg: "#161B21",
          container: "#1D232C",
          links: "#586A84",
          titles: "#7D8FA9",
          input: "#3B4758",
        },
        light: {
          primary: "#00b4d8",
          bg: "#E5E7EB",
          container: "#FFFFFF",
          links: "#586A84",
          titles: "#7D8FA9",
          input: "#f8f9fa",
        },
        success: "#10D096",
        danger: "#FF316A",
      },
      flex: {
        2: "0 0 auto",
      },
    },
  },
  plugins: [],
};
