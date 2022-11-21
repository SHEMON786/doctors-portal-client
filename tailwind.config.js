/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        doctorsTheme: {
          primary: '#0FCFEC',
          secondary: '#19D3AE',
          accent: "#3A4256",
          neutral: "#211D35",
          "base-100": "#FCFCFD",
        },
      },
    ]
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
