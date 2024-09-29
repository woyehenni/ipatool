import type { NuxtError } from "#app"

export const useErrorStore = () =>
  useState<NuxtError | null>("error", () => null)

export const setError = (error: NuxtError) => {
  const errorStore = useErrorStore()
  errorStore.value = error
}

export const resetError = () => {
  const errorStore = useErrorStore()
  errorStore.value = null
}
