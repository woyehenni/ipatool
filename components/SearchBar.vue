<template>
  <div class="px-3">
    <div
      class="flex flex-col md:flex-row lg:flex-row flex-wrap gap-4 justify-between"
    >
      <div class="basis-full md:basis-[40%] lg:basis-[30%]">
        <label
          for="keyword"
          class="lg:block text-sm font-medium leading-6 text-gray-900 sm:hidden"
          >Keyword</label
        >
        <UInput
          id="keyword"
          type="text"
          icon="i-heroicons-magnifying-glass-20-solid"
          size="sm"
          placeholder="Please input the app name"
          v-model="formData.keyword"
          @keydown.enter="search"
        />
      </div>
      <div class="basis-full md:basis-[40%] lg:basis-[30%]">
        <label
          for="region"
          class="lg:block text-sm font-medium leading-6 text-gray-900 sm:hidden"
          >Region</label
        >
        <USelect
          id="region"
          variant="outline"
          :options="countries"
          v-model="formData.region"
        />
      </div>
      <div class="basis-full md:basis-[40%] lg:basis-[30%]">
        <label
          for="platform"
          class="lg:block text-sm font-medium leading-6 text-gray-900 sm:hidden"
          >Platform</label
        >
        <USelect
          id="platform"
          variant="outline"
          :options="['iPhone', 'iPad']"
          v-model="formData.platform"
        />
      </div>
    </div>
    <div class="flex flex-col md:flex-row lg:flex-row justify-end gap-4 pt-4">
      <div class="basis-full md:basis-24">
        <UButton block @click="search">Search</UButton>
      </div>
      <div class="basis-full md:basis-24">
        <UButton block color="white" variant="solid" @click="reset"
          >Reset</UButton
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Storefront } from '~/server/ipatool/store-api/common/storefront';

const countries = Object.keys(Storefront)
const formData = reactive({
  keyword: "",
  region: "CN",
  platform: "iPhone",
})

const emit = defineEmits<{
  search: [keyword: string, region: string, platform?: string]
  reset: []
}>()

function search() {
  emit("search", formData.keyword, formData.region, formData.platform)
}

function reset() {
  formData.keyword = ""
  formData.region = "CN"
  formData.platform = "iPhone"
  emit("reset")
}
</script>

<style scoped></style>
