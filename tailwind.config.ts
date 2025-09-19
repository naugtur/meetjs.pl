import defaultTheme from 'tailwindcss/defaultTheme';
import type { Config } from 'tailwindcss';

const config: Config = {
  safelist: [
    'bg-gradient-to-r',
    'from-indigo-500',
    'from-pink-500',
    'via-yellow-400',
    'to-purple-500',
    'from-indigo-600',
    'via-blue-500',
    'to-purple-500',
    'to-cyan-400',
    'from-yellow-400',
    'via-orange-500',
    'to-pink-500',
    'from-blue',
    'via-purple',
    'to-green',
    'from-green-400',
    'via-emerald-500',
    'to-teal-500',
    'from-green-400',
    'via-blue-500',
    'to-purple-500',
    'from-blue-600',
    'via-indigo-500',
    'from-red-500',
    'to-indigo-600',
    'from-blue-600',
    'from-blue-700',
    'via-indigo-600',
    'to-purple-500',
    'via-purple-600',
    'to-pink-600',
    'from-blue-500',
    'via-cyan-400',
    'to-blue-600',
    'from-purple-600',
    'to-indigo-600',
    'from-purple-600',
    'via-pink-500',
    'to-red-500',
    'from-orange-500',
    'from-orange-600',
    'from-violet-600',
    'to-purple-600',
    'to-pink-600',
  ],
  content: [
    './src/components/**/*.{ts,tsx,mdx}',
    './src/app/**/*.{ts,tsx,mdx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-montserrat)', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        purple: {
          DEFAULT: '#2b1932',
          500: '#2b1932',
          600: '#7c3aed',
        },
        pink: {
          DEFAULT: '#ec4899',
          500: '#ec4899',
          600: '#db2777',
        },
        red: {
          DEFAULT: '#ef4444',
          500: '#ef4444',
        },
        orange: {
          500: '#f97316',
        },
        blue: {
          DEFAULT: '#219eab',
          500: '#219eab',
        },
        green: {
          DEFAULT: '#bcd35d',
          400: '#bcd35d',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
