import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
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
        // New Lendly Turquoise Color System
        // Primary Colors - Turquoise Gradient
        primary: {
          DEFAULT: "#00C6A2", // Main turquoise
          50: "#E6FFFE",
          100: "#CCFDF9",
          200: "#99FBF3",
          300: "#66F9ED",
          400: "#33F7E7",
          500: "#00C6A2", // Main
          600: "#009E82",
          700: "#007662",
          800: "#004E42",
          900: "#002621",
        },
        "primary-light": "#A3F0E2",
        "primary-dark": "#007C7F",
        
        // Secondary Colors - Sky Blue
        secondary: {
          DEFAULT: "#4FD1F8", // Soft sky blue
          50: "#F0F9FF",
          100: "#E0F2FE",
          200: "#BAE6FD",
          300: "#7DD3FC",
          400: "#4FD1F8", // Main
          500: "#0EA5E9",
          600: "#0284C7",
          700: "#0369A1",
          800: "#075985",
          900: "#0C4A6E",
        },
        "secondary-light": "#E6FAFF",
        "secondary-dark": "#005E70",
        
        // Neutrals - Clean & Modern
        background: "#F9FAFB",
        surface: "#FFFFFF",
        border: "#E5E7EB",
        "text-primary": "#0F172A",
        "text-secondary": "#475569",
        "text-muted": "#94A3B8",
        
        // Accent Colors
        success: "#16A34A",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#38BDF8",
        
        // Legacy support (will be phased out)
        emerald: {
          DEFAULT: "#00C6A2", // Updated to match primary
          50: "#E6FFFE",
          100: "#CCFDF9",
          200: "#99FBF3",
          300: "#66F9ED",
          400: "#33F7E7",
          500: "#00C6A2",
          600: "#009E82",
          700: "#007662",
          800: "#004E42",
          900: "#002621",
        },
        sky: {
          DEFAULT: "#4FD1F8", // Updated to match secondary
          50: "#F0F9FF",
          100: "#E0F2FE",
          200: "#BAE6FD",
          300: "#7DD3FC",
          400: "#4FD1F8",
          500: "#0EA5E9",
          600: "#0284C7",
          700: "#0369A1",
          800: "#075985",
          900: "#0C4A6E",
        },
        slate: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
        },
        fog: "#F9FAFB",
        mint: "#A3F0E2", // Updated to match primary-light
        
        // CSS Variables for component system
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        foreground: "hsl(var(--foreground))",
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        pill: "9999px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "gradient-shimmer": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "turquoise-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 198, 162, 0.3)" },
          "50%": { boxShadow: "0 0 30px rgba(0, 198, 162, 0.5)" },
        },
        "gradient-flow": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "gradient-shimmer": "gradient-shimmer 2s ease-in-out infinite",
        "turquoise-glow": "turquoise-glow 2s ease-in-out infinite",
        "gradient-flow": "gradient-flow 3s ease-in-out infinite",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
      boxShadow: {
        "sm": "0 1px 3px rgba(0, 0, 0, 0.08)",
        "md": "0 4px 12px rgba(0, 0, 0, 0.08)",
        "lg": "0 8px 24px rgba(0, 0, 0, 0.10)",
        "xl": "0 20px 40px rgba(0, 0, 0, 0.12)",
      },
      backgroundImage: {
        'gradient-turquoise': 'linear-gradient(135deg, #00C6A2 0%, #4FD1F8 100%)',
        'gradient-turquoise-hover': 'linear-gradient(135deg, #00AEEF 0%, #00C6A2 100%)',
        'gradient-turquoise-subtle': 'linear-gradient(135deg, rgba(0, 198, 162, 0.1) 0%, rgba(79, 209, 248, 0.1) 100%)',
      },
      backgroundClip: {
        'text': 'text',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
