/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#CC0000',
        'primary-light': '#fff0f0',
        'primary-dark': '#aa0000',
        success: '#1a9e3f',
        'success-light': '#f0fff5',
      },
      fontFamily: {
        bangla: ["'Hind Siliguri'", "'Noto Sans Bengali'", 'sans-serif'],
      },
    },
  },
  plugins: [],
};
