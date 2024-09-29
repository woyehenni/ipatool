import { NuxtError } from "nuxt/app"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return $fetch("https://dummyjson.com/auth/login", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body,
  })
})
