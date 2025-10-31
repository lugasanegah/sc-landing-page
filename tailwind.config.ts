module.exports = {
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "prelinecoathens-gray": "var(--prelinecoathens-gray)",
        prelinecobittersweet: "var(--prelinecobittersweet)",
        prelinecoblack: "var(--prelinecoblack)",
        "prelinecoblue-ribbon": "var(--prelinecoblue-ribbon)",
        prelinecocandlelight: "var(--prelinecocandlelight)",
        prelinecocinnabar: "var(--prelinecocinnabar)",
        "prelinecofern-green": "var(--prelinecofern-green)",
        "prelinecogray-chateau": "var(--prelinecogray-chateau)",
        prelinecomalachite: "var(--prelinecomalachite)",
        prelinecomirage: "var(--prelinecomirage)",
        prelinecoorange: "var(--prelinecoorange)",
        "prelinecopale-sky": "var(--prelinecopale-sky)",
        "prelinecored-orange": "var(--prelinecored-orange)",
        "prelinecoselective-yellow": "var(--prelinecoselective-yellow)",
        prelinecosupernova: "var(--prelinecosupernova)",
        prelinecosushi: "var(--prelinecosushi)",
        prelinecovermilion: "var(--prelinecovermilion)",
        prelinecowhite: "var(--prelinecowhite)",
        "prelinecowhite-40": "var(--prelinecowhite-40)",
        "prelinecowhite-50": "var(--prelinecowhite-50)",
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
      },
      fontFamily: {
        "preline-co-inter-regular":
          "var(--preline-co-inter-regular-font-family)",
        "preline-co-manrope-regular":
          "var(--preline-co-manrope-regular-font-family)",
        "preline-co-semantic-blockquote":
          "var(--preline-co-semantic-blockquote-font-family)",
        "preline-co-semantic-button":
          "var(--preline-co-semantic-button-font-family)",
        "preline-co-semantic-heading-2":
          "var(--preline-co-semantic-heading-2-font-family)",
        "preline-co-semantic-heading-3":
          "var(--preline-co-semantic-heading-3-font-family)",
        "preline-co-semantic-heading-4":
          "var(--preline-co-semantic-heading-4-font-family)",
        "preline-co-semantic-item":
          "var(--preline-co-semantic-item-font-family)",
        "preline-co-semantic-link":
          "var(--preline-co-semantic-link-font-family)",
        inter: ["Inter", "sans-serif"],
        manrope: ["Manrope", "sans-serif"],
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
  darkMode: ["class"],
};
