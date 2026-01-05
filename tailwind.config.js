/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'], // Use class-based dark mode
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.625rem',
        xl: '0.875rem',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'), // optional for animate utilities
  ],
};
