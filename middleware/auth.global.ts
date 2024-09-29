import { useAuthStore } from "~/composables/auth.store"

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore() // make authenticated state reactive
  const token = useCookie("token") // get token from cookies

  if (token.value) {
    // check if value exists
    // todo verify if token is valid, before updating the state
    authStore.value.authenticated = true // update the state to authenticated
  }

  // if token exists and url is /login redirect to homepage
  if (token.value && to?.name === "login") {
    return navigateTo("/")
  }

  // if token doesn't exist redirect to login
  if (!token.value && to?.name !== "login") {
    abortNavigation()
    return navigateTo("/login")
  }
})
