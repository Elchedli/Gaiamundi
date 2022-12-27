import defaultTheme from 'tailwindcss/defaultTheme';

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        accordion: {
          '0%': {
            opacity: 0.5,
            marginTop: -16,
          },
          '100%': {
            opacity: 1,
            marginTop: 0,
          },
        },
      },
      animation: {
        accordion: 'accordion linear .25s',
      },
      colors: {
        'royal-blue': {
          100: '#F0F1FC',
          200: '#D9DCF9',
          300: '#C2C7F5',
          400: '#959CED',
          500: '#6772E5',
          600: '#5D67CE',
          700: '#3E4489',
          800: '#2E3367',
          900: '#1F2245',
        },
      },
      maxWidth: {
        '8xl': '90rem',
      },
      screens: {
        xs: '475px',
        ...defaultTheme.screens,
      },
    },
  },
  // plugins: [require('@tailwindcss/typography')],
  variants: {
    extend: {
      display: ['group-hover'],
    },
  },
};
