module.exports = {
  darkMode: ['class'],
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        secondary: 'var(--secondary)',
        'secondary-foreground': 'var(--secondary-foreground)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        accent: 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',
        destructive: 'var(--destructive)',
        'destructive-foreground': 'var(--destructive-foreground)',
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
        '.border-border': { borderColor: theme('colors.border') },
        '.outline-ring': { outlineColor: theme('colors.ring') },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    },
  ],
}
