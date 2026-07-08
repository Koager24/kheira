/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A1F3C",        // Deep Navy – Primärfarbe
        inkSoft: "#26436B",
        accent: "#4A7BB5",     // Medical Blue – Akzent
        accentSoft: "#A8C4E5",
        mist: "#EDF2F8",
        line: "#E2E8F1",
        paper: "#FAFBFD",
        ok: "#2F8F6F",
        warn: "#B7791F",
        danger: "#B4443C",
      },
      fontFamily: {
        sans: ["Manrope", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(10,31,60,0.04), 0 8px 24px rgba(10,31,60,0.06)",
        lift: "0 2px 4px rgba(10,31,60,0.05), 0 16px 40px rgba(10,31,60,0.10)",
      },
      borderRadius: {
        card: "1.25rem",
      },
    },
  },
  plugins: [],
};
