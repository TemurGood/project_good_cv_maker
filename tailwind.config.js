/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        aura: {
          blue: '#0071e3',
          gray: '#86868b',
          dark: '#1d1d1f',
          light: '#f5f5f7',
        }
      }
    },
  },
  plugins: [],
};