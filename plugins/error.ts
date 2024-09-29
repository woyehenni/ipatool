import type { NuxtError } from "#app"

export default defineNuxtPlugin((nuxtApp) => {
  // nuxtApp.hook("vue:error", (error) => {
  //   console.log("vue:error")

  //   const nuxtError = error as NuxtError<{ message: string }>
  //   if (nuxtError?.data?.message) {
  //     const errorState = useErrorStore()
  //     errorState.value = {
  //       statusCode: nuxtError?.statusCode,
  //       statusMessage: nuxtError?.statusMessage,
  //       data: nuxtError?.data,
  //     }
  //   }
  //   // if (process.client) {
  //   //   console.log(..._args)
  //   // }
  // })
  // nuxtApp.hook("app:error", (..._args) => {
  //   console.log("app:error")
  //   // if (process.client) {
  //   //   console.log(..._args)
  //   // }
  // })
  // nuxtApp.vueApp.config.errorHandler = (..._args) => {
  //   console.log("global error handler")
  //   // if (process.client) {
  //   //   console.log(..._args)
  //   // }
  // }
})
