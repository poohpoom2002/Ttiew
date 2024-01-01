/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily :{
        Sigmar: ['Sigmar'],
        Anuphan: ['Anuphan'],
        Fatface:['Abril Fatface'],
        LilitaOne: ['Lilita One'],
        Mali: ['Mali'],
        Mitr:['Mitr']
      },
    },
  },
  plugins: [],
}

