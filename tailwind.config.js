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
        fadeInFromLeft: {
          "0%": { opacity: 0, transform: "translateX(-100%)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        scaleIn: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "rotate-and-scale": "rotateAndScale 500ms ease-in-out forwards",
        "fade-in-from-left": "fadeInFromLeft 1000ms ease-in-out forwards",
        "fade-out": "fadeOut 1000ms ease-in-out forwards",
        "scale-in": "scaleIn 300ms ease-in-out forwards",
      },
      fontFamily: {
        "big-shoulder-tencil": ["Big Shoulders Stencil Text", "sans-serif"],
      },
      backgroundImage: {
        background: "url('assets/images/background.png')",
      },
    },
  },
  plugins: [],
};
