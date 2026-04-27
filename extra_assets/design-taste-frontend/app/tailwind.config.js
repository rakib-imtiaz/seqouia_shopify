/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Skill: BANNED Inter. Use Outfit (display) + JetBrains Mono (numbers)
        display: ['Outfit', 'system-ui', 'sans-serif'],
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Skill: NO pure black, neutral base + 1 accent. Off-black + moss accent (desaturated)
        ink: {
          50:  '#f6f7f6',
          100: '#eceeec',
          200: '#d4d8d5',
          300: '#aab2ad',
          400: '#7d877f',
          500: '#566059',
          600: '#3d4641',
          700: '#2b322e',
          800: '#1d2220',
          900: '#141816',
          950: '#0d100f',
        },
        cream: {
          50:  '#fbfaf6',
          100: '#f4f1e8',
          200: '#e9e3d2',
        },
        moss: {
          50:  '#f0f5f1',
          100: '#dbe7dd',
          200: '#b6cdba',
          300: '#8aae91',
          400: '#5e8e69',
          500: '#3f6e4a',
          600: '#305739',
          700: '#26452d',
          800: '#1d3623',
          900: '#13241a',
        },
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'soft':   '0 1px 0 rgba(20,24,22,0.04), 0 6px 24px -8px rgba(20,24,22,0.10)',
        'lift':   '0 10px 40px -16px rgba(20,24,22,0.20)',
        'inset-edge': 'inset 0 1px 0 rgba(255,255,255,0.06)',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        breathe: {
          '0%,100%': { opacity: 0.55 },
          '50%':     { opacity: 1 },
        },
      },
      animation: {
        marquee:  'marquee 38s linear infinite',
        floaty:   'floaty 5s ease-in-out infinite',
        shimmer:  'shimmer 2.4s linear infinite',
        breathe:  'breathe 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
