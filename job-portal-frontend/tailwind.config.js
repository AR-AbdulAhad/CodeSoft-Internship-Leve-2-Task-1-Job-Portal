/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      "primary-color": "#fff",
      "secondary-color": "#f5f7fb",
      "first-text-color": "#23232e",
      "second-text-color": "#32313d",
      "third-text-color": "#4440da",
      "forth-text-color": "#797979",
    },
  },
  plugins: [],
}