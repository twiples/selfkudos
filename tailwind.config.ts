import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Warm professional palette

        // Primary warm neutrals (for text and UI)
        stone: {
          950: '#1c1917',  // Deepest - headlines
          900: '#292524',  // Dark text
          800: '#44403c',  // Body text
          700: '#57534e',  // Secondary text
          600: '#78716c',  // Muted text
          500: '#a8a29e',  // Placeholder
          400: '#d6d3d1',  // Borders
          300: '#e7e5e4',  // Light borders
          200: '#f5f5f4',  // Subtle backgrounds
          100: '#fafaf9',  // Light backgrounds
          50: '#fefdfb',   // Near white
        },

        // Warm accent - Amber/Gold
        amber: {
          900: '#78350f',
          800: '#92400e',
          700: '#b45309',
          600: '#d97706',
          500: '#f59e0b',
          400: '#fbbf24',
          300: '#fcd34d',
          200: '#fde68a',
          100: '#fef3c7',
          50: '#fffbeb',
        },

        // Secondary warm accent - Terracotta/Rust
        terracotta: {
          900: '#7c2d12',
          800: '#9a3412',
          700: '#c2410c',
          600: '#ea580c',
          500: '#f97316',
          400: '#fb923c',
          300: '#fdba74',
          200: '#fed7aa',
          100: '#ffedd5',
          50: '#fff7ed',
        },

        // Warm cream backgrounds
        cream: {
          DEFAULT: '#fdfcfa',
          warm: '#faf8f5',
          dark: '#f5f3ef',
        },

        // Deep warm for CTAs and emphasis
        espresso: {
          DEFAULT: '#3d2e24',
          light: '#5c4435',
          dark: '#2a1f18',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
    },
  },
  plugins: [],
}
export default config
