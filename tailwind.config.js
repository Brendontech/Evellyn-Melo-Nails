/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#070605', 2: '#0f0c0a', 3: '#18130f' },
        cream: '#f6ecdf',
        mute: '#b9a896',
        nude: '#e7c3ad',
        gold: { deep: '#8b5a2b', DEFAULT: '#d8a86c', light: '#e3b57c', pale: '#fff0d4', btn: '#e6c393' },
        hair: 'rgba(230,190,140,0.18)',
        season: 'var(--season)',
      },
      fontFamily: {
        serif: ['"Bodoni Moda"', 'Didot', '"Bodoni 72"', 'Georgia', 'serif'],
        caps: ['Cinzel', '"Trajan Pro"', 'Georgia', 'serif'],
        sans: ['Jost', 'Futura', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { label: '0.3em' },
      screens: { xs: '380px' },
    },
  },
  plugins: [],
}
