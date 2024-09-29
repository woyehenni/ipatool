<template>
  <div class="max-w-5xl mx-auto pt-10">
    <search-bar @search="doSearch" @reset="reset" />
    <app-list
      :loading="appStore.loading"
      :apps="appStore.apps"
      @select="onSelect"
    />
  </div>
</template>
<script setup lang="ts">
import type { App } from "~/types"

useHead({
  title: "App search",
})

// definePageMeta({
//   middleware: "auth",
// })
const appStore = useAppStore()

function doSearch(keyword: string, region: string, platform?: string) {
  searchApps(keyword, region, platform)
}
function reset() {
  resetApps()
}
function onSelect(row: App) {
  navigateTo(`app/${row.trackId}`)
}
</script>
