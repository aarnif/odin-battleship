/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.html", "./src/**/*.js"],
  theme: {
    extend: {
      keyframes: {
        rotateAndScale: {
          "0%": { transform: "rotate(0) scale(1)" },
          "100%": { transform: "rotate(360deg) scale(1.5)" },
        },
      },
      animation: {
        "rotate-and-scale": "rotateAndScale 500ms ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
