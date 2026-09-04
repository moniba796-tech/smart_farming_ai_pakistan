/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        farm: {
          50: "#f2f9f2",
          100: "#e0f2e1",
          200: "#c2e5c4",
          300: "#95d199",
          400: "#66bb6a",
          500: "#43a047",
          600: "#2e7d32",
          700: "#256428",
          800: "#1f5023",
          900: "#1a421e",
        },
        wheat: {
          50: "#fdf9ee",
          100: "#faf0d1",
          400: "#e8c05e",
          500: "#d9a53a",
          600: "#b9832a",
        },
        sky: {
          50: "#eef8fb",
          400: "#4fb8d6",
          500: "#2f9fc0",
        },
      },
      fontFamily: {
        sans: ["Poppins", "Segoe UI", "system-ui", "sans-serif"],
        urdu: ["Noto Nastaliq Urdu", "serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "wiggle": "wiggle 1.2s ease-in-out infinite",
        "grow": "grow 0.6s ease-out forwards",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        grow: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-500px 0" },
          "100%": { backgroundPosition: "500px 0" },
        },
      },
      boxShadow: {
        card: "0 4px 20px rgba(46, 125, 50, 0.08)",
        "card-hover": "0 12px 30px rgba(46, 125, 50, 0.18)",
      },
    },
  },
  plugins: [],
};
