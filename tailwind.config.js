/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      // aspectRatio: {
      //   auto: "auto",
      //   square: "1 / 1",
      //   video: "16 / 9",
      // },
    },
  },
  plugins: [],
}
