import type { Config } from 'tailwindcss'
const defaultTheme = require('tailwindcss/defaultTheme')

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'main-pattern': "url('/public/Swirl.png'))",
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'custom-black': '#121b2a',
        'custom-blue': '#233465',
        'custom-bg-moredetail': '#f7f8fa',
      },
    },
  },
  plugins: [],
};
export default config
