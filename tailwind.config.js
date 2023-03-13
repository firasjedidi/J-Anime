// tailwind.config.js
module.exports = {
    content: [
        "./App.{js,jsx,ts,tsx}",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
      ],
    theme: {
        extend: {
           
        },
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
    ],
}