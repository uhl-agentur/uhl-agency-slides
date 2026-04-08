/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ADF803',
        'primary-dark': '#000000',
        background: '#FFFFFF',
        'gray-100': '#F7F7F7',
        'gray-200': '#E5E5E5',
        'gray-600': '#666666',
        'gray-900': '#333333',
      },
      fontFamily: {
        humane: ['"Humane"', 'sans-serif'],
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      fontSize: {
        // Display - 0.75em line-height for tight spacing
        'display-1': ['270px', { lineHeight: '0.75em', letterSpacing: '5.4px' }],
        'display-2': ['128px', { lineHeight: '0.75em', letterSpacing: '2.56px' }],
        'display-3': ['72px', { lineHeight: '0.75em', letterSpacing: '0.72px' }],
        // Body - auto (normal) line-height
        'body-lg': ['32px', { lineHeight: 'normal' }],
        'body': ['24px', { lineHeight: 'normal' }],
        'body-sm': ['18px', { lineHeight: 'normal' }],
      },
      spacing: {
        'slide-padding': '80px',
      },
      width: {
        'slide': '1920px',
      },
      height: {
        'slide': '1080px',
      },
    },
  },
  plugins: [],
}
