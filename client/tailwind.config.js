/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        tarmarket: {
          cream: '#FAF9F6',   // Background
          tan: '#D2B48C',     // Accents/Cards
          umber: '#4A3728',   // Text/Primary Buttons
          sand: '#F4A460',    // Wallet/Highlight
          clay: '#8B735B',    // Muted text
        }
      },
    },
  },
  plugins: [],
}