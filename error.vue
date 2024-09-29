<script setup lang="ts">
import type { NuxtError } from "#app"

// {
//   statusCode: number
//   fatal: boolean
//   unhandled: boolean
//   statusMessage?: string
//   data?: unknown
//   cause?: unknown
// }
// const error = useError()
const props = defineProps({
  error: Object as () => NuxtError<{
    message: string
  }>,
})
</script>

<template>
  <div>
    <h1>{{ error!.statusCode }}</h1>
    <h1>{{ error!.data?.message }}</h1>
      <p>It looks like something broke.</p>
      <p>Sorry about that.</p>
    <NuxtLink to="/">Go back home</NuxtLink>
  </div>
</template>
