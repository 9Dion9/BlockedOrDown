/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // Enables dark: prefix for toggle
  theme: {
    extend: {
      colors: {
        'brand-blue': '#0A84FF',
      },
    },
  },
  plugins: [],
}