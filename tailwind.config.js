module.exports = {
  content: ["./imports/ui/**/*.{js,jsx,ts,tsx}", './client/*.html'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        sans: ['montserrat']
      }
    }
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          "primary": "#18A0FB",
          "neutral": "#333333",
          "accent": "#545454"
          // "base-100": '#333333'
        },
      }
    ]
    
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")]
}
