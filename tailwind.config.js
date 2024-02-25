import { nextui } from "@nextui-org/react"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1.1rem",
        screens: {
          "2xl": "1400px",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#fafafa",
            foreground: "#11181C",
            primary: {
              DEFAULT: "#006FEE",
            },
            secondary: {
              DEFAULT: "#0E8AAA",
            },
          },
        },
        dark: {
          colors: {
            background: "#0D0D0D",
            foreground: "#ECEDEE",
            primary: {
              DEFAULT: "#006FEE",
            },
            secondary: {
              DEFAULT: "#09AACD",
            },
          },
        },
      },
    }),
  ],
}
