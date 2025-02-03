/** @type {import('tailwindcss').Config} */
const { heroui } = require("@heroui/react");

module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                primary: '#1D4ED8',
                success: '#22C55E',
            },
        },
    },
    darkMode: "class",
    plugins: [heroui()],
}