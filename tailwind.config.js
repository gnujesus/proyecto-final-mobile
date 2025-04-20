/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#08AB78",
        primary2: "#197759",
        secondary: "#6a5b3c",
        accent: "#a89e65",
        light: "#343638",
        dark: "#030403",
        dark2: "#000",
        background: "#111",
        background2: "#000",
        text: "#fff",
        danger: "#da5151",
        gray: "#9e9e9e",
      },
      fontSize: {
        // You can override or extend Tailwind's defaults here
        xs: ["12px", { lineHeight: "16px" }],
        sm: ["14px", { lineHeight: "20px" }],
        base: ["16px", { lineHeight: "24px" }],
        md: ["17px", { lineHeight: "25px" }], // Custom
        lg: ["18px", { lineHeight: "28px" }],
        xl: ["20px", { lineHeight: "28px" }],
        "2xl": ["24px", { lineHeight: "32px" }],
        "3xl": ["30px", { lineHeight: "36px" }],
        "4xl": ["36px", { lineHeight: "40px" }],
        "5xl": ["48px", { lineHeight: "1" }],
        "6xl": ["60px", { lineHeight: "1" }],
      },
    },
  },
  plugins: [],
};
