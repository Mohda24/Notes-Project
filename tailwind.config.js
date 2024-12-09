/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Tajawal: ["Tajawal", "sans-serif" ]
      },
      colors: {
        "primary-color": "var(--primary-color)",
        "bg-color": "var(--bg-color)",
        "primaryCard-bg": "var(--PimaryCard-bg)",
        "secondaryCard-bg": "var(--secondaryCard-bg)",
        "text-color": "var(--text-color)"
      },
      animation: {
        fadeIn: "fadeIn 0.6s ease-in-out forwards",
        show: "show 0.5s ease-in-out forwards",
        offShow: "offShow 0.4s ease-in-out forwards",
      },
    },
  },
  plugins: [],
}