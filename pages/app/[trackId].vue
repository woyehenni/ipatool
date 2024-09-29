<template>
  <div class="max-w-5xl mx-auto pt-10">
    <version-list
      :loading="appStore.loading"
      :versions="appStore.versions"
      @download="doDownload"
    />
  </div>
</template>
<script setup lang="ts">
import type { Version } from "~/types"

useHead({
  title: "App versions",
})

const route = useRoute()
const appStore = useAppStore()

onMounted(() => {
  searchAppVersions(route.params.trackId as string)
})

async function doDownload(row: Version) {
  const data = await downloadApp(row)
  if (data?.taskId) {
      navigateTo(`/download/${data.taskId}`)
  }
}
</script>
