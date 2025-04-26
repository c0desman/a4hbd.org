/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
      extend: {
        colors: {
          primary: '#0B98D5',    // replace with your actual primary color
          secondary: '#F9B118',  // replace with your actual secondary color
        },
      },
    },
    content: [
      './src/**/*.{js,ts,jsx,tsx}', // adjust if your files are outside src
    ],
    plugins: [],
  }
  