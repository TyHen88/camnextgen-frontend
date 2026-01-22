import type { Config } from 'tailwindcss';

const preset: Config = {
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        ink: {
          50: '#f6f7f9',
          100: '#e8eaee',
          200: '#c5ccd6',
          300: '#a1adbf',
          400: '#7c8fa9',
          500: '#5c6f8f',
          600: '#465672',
          700: '#344254',
          800: '#232d39',
          900: '#121820'
        },
        coral: {
          50: '#fff1ee',
          100: '#ffd9d1',
          200: '#ffb2a2',
          300: '#ff8b73',
          400: '#ff6445',
          500: '#ff3d16',
          600: '#e2320f',
          700: '#b7270a',
          800: '#8c1c06',
          900: '#611203'
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Work Sans"', 'sans-serif']
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      boxShadow: {
        glow: '0 24px 60px -30px rgba(0, 0, 0, 0.55)'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};

export default preset;
