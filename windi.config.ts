import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      colors: {
        gray: '#ececec'
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      borderRadius: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '4xl': '2rem',
      },
      alias: {
        'w-h-full': 'w-full h-full',
        'fixed-all-full': 'fixed left-0 right-0 top-0 bottom-0'
      }
    },
    include: [
      'index.html',
      'src/**/*.{vue,html,jsx,tsx}',
    ],
    exclude: [
      'node_modules/**/*',
      'dist/**/*',
      '.git/**/*',
    ],
  },
})