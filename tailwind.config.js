/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        'palette-blue': {
          'darkest': '#001832',
          'darker': '#022445',
          'deep': '#003163',
          'medium-dark': '#02448C',
          'medium': '#0370B7',
          'bright': '#0046FF',
        },
        'cyber-blue': {
          50: '#E5F5FF',
          100: '#CCEBFF',
          200: '#99D7FF',
          300: '#66C3FF',
          400: '#33AFFF',
          500: '#0046FF',
          600: '#0370B7',
          700: '#02448C',
          800: '#003163',
          900: '#022445',
        },
        'cyber-dark': {
          50: '#1A1F2A',
          100: '#141920',
          200: '#0F141A',
          300: '#0A0F15',
          400: '#050A10',
          500: '#0A0E1A',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        'gradient-cyber': 'linear-gradient(135deg, #0A0E1A 0%, #001832 25%, #022445 50%, #001832 75%, #0A0E1A 100%)',
        'gradient-blue-black': 'linear-gradient(135deg, #0A0E1A 0%, #022445 50%, #0A0E1A 100%)',
        'gradient-blue-glow': 'linear-gradient(135deg, #0996E8 0%, #0370B7 50%, #02448C 100%)',
        'gradient-futuristic': 'radial-gradient(ellipse at top left, rgba(9, 150, 232, 0.1) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(0, 49, 99, 0.05) 0%, transparent 50%), linear-gradient(135deg, #0A0E1A 0%, #001832 25%, #0A0E1A 50%, #001832 75%, #0A0E1A 100%)',
      },
      boxShadow: {
        'cyber-blue': '0 0 20px rgba(59, 130, 246, 0.6), 0 0 40px rgba(59, 130, 246, 0.4)',
        'cyber-blue-sm': '0 0 10px rgba(59, 130, 246, 0.5)',
        'cyber-blue-lg': '0 0 30px rgba(59, 130, 246, 0.7), 0 0 60px rgba(59, 130, 246, 0.5)',
      },
    },
  },
  plugins: [],
}