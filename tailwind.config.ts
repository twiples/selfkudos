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
        // Refined palette with better contrast

        // Text colors - rich charcoal, not gray
        ink: {
          900: '#1a1a1a',  // Headlines
          800: '#2d2d2d',  // Body text
          700: '#404040',  // Secondary text
          600: '#595959',  // Muted text
          500: '#737373',  // Subtle text
          400: '#a3a3a3',  // Disabled
          300: '#d4d4d4',  // Borders
          200: '#e5e5e5',  // Light borders
          100: '#f5f5f5',  // Subtle backgrounds
        },

        // Primary accent - Deep Sage (growth, nature, calm)
        sage: {
          900: '#2d3b2d',
          800: '#3d4f3d',
          700: '#4a5d4c',
          600: '#5a7259',
          500: '#6b8569',
          400: '#8fa88f',
          300: '#b3c7b3',
          200: '#d4e2d4',
          100: '#e8f0e8',
          50: '#f4f8f4',
        },

        // Secondary accent - Warm Coral (energy, warmth)
        coral: {
          900: '#7c2d12',
          800: '#9a3419',
          700: '#c2441a',
          600: '#e07b5c',
          500: '#eb9274',
          400: '#f4a98d',
          300: '#f9c4b0',
          200: '#fcddd3',
          100: '#feefea',
          50: '#fff7f5',
        },

        // Highlight - Rich Gold
        gold: {
          900: '#78550f',
          800: '#946a12',
          700: '#b38216',
          600: '#c9a227',
          500: '#d4b43d',
          400: '#e0c65c',
          300: '#ebd88a',
          200: '#f5e9b8',
          100: '#faf4dc',
          50: '#fdfaee',
        },

        // Background variations
        paper: {
          DEFAULT: '#ffffff',
          warm: '#faf8f5',
          sand: '#f5f0e8',
        },

        // Dark sections
        night: {
          DEFAULT: '#1a1a1a',
          light: '#2d2d2d',
          soft: '#363636',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        logo: ['var(--font-logo)', 'Cormorant Garamond', 'Georgia', 'serif'],
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
