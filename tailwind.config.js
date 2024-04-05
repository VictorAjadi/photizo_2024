/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.ejs", // Scan EJS files in "views" folder
    "./customJS/**/*.js",  // Assuming your JS files are in "assets" folder
  ],
  theme: {
    extend: {
      backgroundImage: {
        "my-showcase": "url(/showcase.jpg)", // Adjusted image path
      },
      animation: {
        blob: "blob 7s infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)", // Fixed typo in translate
          },
        },
      },
      colors: {
        secondary: '#A020F0',
        primary: {
          100: '#fc6c0d',
          200: '#fc9b5a',
          300: '#f0ac7f',
        },
        title: '#707070',
        small: '#fef7f2'
      },
      fontFamily: {
        body: ['Outfit']
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
