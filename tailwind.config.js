module.exports = {
  darkMode: ['class'],
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'var(--border)',
        ring: 'var(--ring)',
      },
      borderRadius: {
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.625rem',
        xl: '0.875rem',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    function ({ addUtilities, theme }) {
      const newUtilities = {
        '.border-border': {
          borderColor: theme('colors.border'),
        },
        '.outline-ring': {
          outlineColor: theme('colors.ring'),
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    },
  ],
}
