module.exports = {
  content: ["./imports/ui/**/*.{js,jsx,ts,tsx}", './client/*.html'],
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: ["winter"]
  }
}
