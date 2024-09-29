interface UserPayloadInterface {
  appleid: string
  password: string
  code?: string
}

interface AuthStateInterface {
  authenticated: boolean
}

export const useAuthStore = () =>
  useState<AuthStateInterface>("auth", () => ({
    authenticated: false,
  }))

export async function authenticate({
  appleid,
  password,
  code,
}: UserPayloadInterface) {
  const authStore = useAuthStore()
  const loadingStore = useLoadingStore()
  loadingStore.value.loading = true
  const { data, error, pending }: any = await useFetch("/api/auth/login", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: {
      email: appleid,
      password,
      mfa: code,
    },
  })
  loadingStore.value.loading = pending.value

  if (data.value) {
    const token = useCookie("token") // useCookie new hook in nuxt 3
    token.value = data?.value?.accessToken // set token to cookie
    const accountInfo = useCookie("account")
    accountInfo.value = data?.value?.accountInfo
    authStore.value.authenticated = true // set authenticated  state value to true
  } else {
    throw createError(error.value.data)
  }
}

export function logout() {
  const authStore = useAuthStore()
  authStore.value.authenticated = false // set authenticated  state value to false

  const token = useCookie("token") // useCookie new hook in nuxt 3
  token.value = null // clear the token cookie
}
