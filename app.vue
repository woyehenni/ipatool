<template>
  <div>
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <LoadingWrapper :loading="loadingStore.loading" />
      <ErrorPopup />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
useServerHead({
  htmlAttrs: { lang: "zh" },
})
useHead({
  titleTemplate: "%s - ipa download",
})

const loadingStore = useLoadingStore()
</script>
