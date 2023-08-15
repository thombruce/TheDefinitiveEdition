/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      { light: { ...require("daisyui/src/theming/themes")["[data-theme=autumn]"] } },
      { dark: { ...require("daisyui/src/theming/themes")["[data-theme=dracula]"] }
      }
    ]
  }
}
