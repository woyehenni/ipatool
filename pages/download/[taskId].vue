<template>
  <div class="max-w-5xl mx-auto px-4 pt-10">
    <div class="flex gap-4">
      <UProgress :value="progress.progress" indicator class="flex-1" />
      <UBadge :color="color[progress.status]">{{ progress.status }}</UBadge>
      <UButton
        class="flex-0 bg-primary"
        :disabled="progress.status !== 'complete'"
        @click="doDownload"
      >
        Download</UButton
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import type { DownloadProgress } from "~/types"

useHead({
  title: "App download",
})

const route = useRoute()
const progress: Ref<DownloadProgress> = ref({
  status: "downloading",
  progress: 0,
})

const color = {
  downloading: "primary",
  signing: "orange",
  complete: "green",
  failed: "red",
}

onMounted(() => {
  nextTick(() => {
    const timerId = setInterval(async () => {
      getProgress(route.params.taskId as string)
        .then((data: DownloadProgress) => {
          progress.value = data
          if (data.status === "complete") {
            clearInterval(timerId)
          }
        })
        .catch(() => {
          clearInterval(timerId)
        })
    }, 1000)
  })
})

function doDownload() {
  window.open(`${location.origin}${progress.value.url}`)
}
</script>
