/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      "autumn",
      { dark: { ...require("daisyui/src/theming/themes")["[data-theme=dracula]"] }
      }
    ]
  }
}
