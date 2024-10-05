/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    './views/**/*.html',   // Scans all HTML files inside the views folder
    './public/**/*.js',    // If you have any JavaScript files to scan
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
