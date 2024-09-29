<template>
  <div>
    <AppHeader v-if="token" />
    <slot />
    <AppFooter />
  </div>
</template>
<script lang="ts" setup>
const token = useCookie("token")
</script>
