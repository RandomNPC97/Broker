/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'footer_theme': '#e7e7e7',
        'primary_theme': 'rgb(255, 255, 255)',
        'primary_theme2': '#dfe4ef',
        'secondary_theme': '#111827',
        'secondary_theme2': '#3b82f6',
        'text_theme': 'rgb(81, 81, 81);'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}