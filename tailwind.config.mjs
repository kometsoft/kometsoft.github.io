const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['BR Sonoma', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: colors.orange,
        secondary: colors.blue,
        success: colors.emerald,
        danger: colors.red,
      },
      typography: {
        DEFAULT: {
          css: {
            a: {
              'word-wrap': 'break-word',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
