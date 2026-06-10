/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#f2f8fc',
          100: '#d9ecf7',
          200: '#b5d8ef',
          300: '#82bfe3',
          400: '#4f9fd3',
          500: '#257fbd',
          600: '#1f659b',
          700: '#1f517c',
          800: '#1c4565',
          900: '#143147',
          950: '#0b1522'
        },
        sand: '#f8f4ea',
        gold: '#d9b46f',
        navy: '#0d1b2a'
      },
      boxShadow: {
        glow: '0 20px 60px rgba(13, 27, 42, 0.18)'
      },
      backgroundImage: {
        'ocean-gradient': 'linear-gradient(135deg, rgba(13,27,42,0.98), rgba(31,81,124,0.92), rgba(37,127,189,0.82))',
        'hero-radial': 'radial-gradient(circle at top, rgba(217,180,111,0.18), transparent 34%), radial-gradient(circle at bottom right, rgba(82,168,255,0.18), transparent 32%)'
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};