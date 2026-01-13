/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#FFFFFF',
        'primary-text': '#1A1A1A',
        'primary-accent': '#2563EB',
        'secondary-bg': '#F8F9FA',
        'secondary-text': '#666666',
        'secondary-accent': '#10B981',
      },
      fontFamily: {
        sans: ['Pretendard', 'Noto Sans KR', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

