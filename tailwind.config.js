/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '10px 10px 39px -13px rgba(0, 0, 0, 0.75)',
      },
      margin: {
        'icon-auth': '5% auto 2% auto',
      }
    },
  },
  plugins: [],
}

