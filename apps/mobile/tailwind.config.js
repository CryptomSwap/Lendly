const { colors, gradients, spacing, borderRadius, elevation, typography, fontFamily } = require('./src/constants/theme');

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Primary gradient colors (mint to cyan)
        primary: colors.primary,
        // Secondary accent (purple)
        secondary: colors.secondary,
        // Cyan gradient component
        cyan: colors.cyan,
        // Surface colors
        surface: colors.surface,
        // Text colors
        text: colors.text,
        // Semantic colors
        semantic: colors.semantic,
        // Neutral grays
        gray: colors.gray,
      },
      fontFamily: {
        'rubik': [fontFamily.primary, 'System'],
        'heebo': [fontFamily.secondary, 'System'],
        'hebrew': [fontFamily.primary, 'System'],
      },
      fontSize: {
        'display': [`${typography.display.fontSize}px`, { lineHeight: `${typography.display.lineHeight}px` }],
        'h1': [`${typography.h1.fontSize}px`, { lineHeight: `${typography.h1.lineHeight}px` }],
        'h2': [`${typography.h2.fontSize}px`, { lineHeight: `${typography.h2.lineHeight}px` }],
        'h3': [`${typography.h3.fontSize}px`, { lineHeight: `${typography.h3.lineHeight}px` }],
        'body': [`${typography.body.fontSize}px`, { lineHeight: `${typography.body.lineHeight}px` }],
        'body-medium': [`${typography.bodyMedium.fontSize}px`, { lineHeight: `${typography.bodyMedium.lineHeight}px` }],
        'body-large': [`${typography.bodyLarge.fontSize}px`, { lineHeight: `${typography.bodyLarge.lineHeight}px` }],
        'caption': [`${typography.caption.fontSize}px`, { lineHeight: `${typography.caption.lineHeight}px` }],
        'caption-medium': [`${typography.captionMedium.fontSize}px`, { lineHeight: `${typography.captionMedium.lineHeight}px` }],
        'mono': [`${typography.mono.fontSize}px`, { lineHeight: `${typography.mono.lineHeight}px` }],
      },
      spacing: spacing,
      borderRadius: borderRadius,
      boxShadow: {
        'elev-1': elevation.sm,
        'elev-2': elevation.md,
        'elev-3': elevation.lg,
        'elev-4': elevation.xl,
      },
    },
  },
  plugins: [],
};
