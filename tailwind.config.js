const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors:{
        // mainGreen:"#0ACF83",
        // mainGreen:"#EE99C2",
        mainGreen:"#EE99C2",
        textPink:"#921A40",
        textGray:"#848688",
        navText:"#7F7F7F",
        backGray:"#BABABA",
        rederror:"#DF2E38",
        warning:"#FFC120"


      }
    },
  },
  plugins: [ flowbite.plugin(),],
}

