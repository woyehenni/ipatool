<script setup lang="ts">
defineProps<{
  loading: boolean
}>()
</script>

<template>
  <div v-if="loading" class="loading-wrapper">
    <LoadSpinner />
  </div>
  <slot v-else />
</template>
<style scoped>
.loading-wrapper {
  inset: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2000;
}
</style>
