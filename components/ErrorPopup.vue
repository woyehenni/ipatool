<script setup lang="ts">
const errorStore = useErrorStore()
const toast = useToast()

watch(
  () => errorStore.value,
  (error) => {
    if (error?.statusMessage) {
      toast.add({
        id: "error",
        color: "red",
        title: error?.statusMessage || "Unknow Error",
        // description: error?.data?.message,
        icon: "i-heroicons-exclamation-triangle-20-solid",
        timeout: 0,
        callback: () => {
          resetError()
        },
      })
    }
  }
)
</script>
<!-- You use the default slot to render your content -->
<template>
  <UNotifications
    v-if="errorStore"
    :ui="{
      position: 'top-0 right-0',
    }"
  />
</template>
