/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require("daisyui")
  ],
  daisyui: {
    themes: [
      "autumn",
      { dark: { ...require("daisyui/src/theming/themes")["[data-theme=dracula]"] }
      }
    ]
  }
}

