<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="-mx-4 mt-8 sm:-mx-0">
      <UTable
        :loading
        :loading-state="{
          icon: 'i-heroicons-arrow-path-20-solid',
          label: 'Loading...',
        }"
        :emptyState="null as unknown as undefined"
        :ui="{
          wrapper: 'overflow-y-hidden',
        }"
        :progress="{ color: 'primary', animation: 'carousel' }"
        :columns="columns"
        :rows="rows"
        @select="selectItem"
      >
        <template #icon-data="{ row }">
          <img :src="row.icon" alt="" srcset="" class="w-8" />
        </template>
        <template #size-data="{ row }">
          <span>{{ (row.size / (1024 * 1024)).toFixed(2) }}MB</span>
        </template>
        <template #trackId-data="{ row }">
          <ULink
            :to="`https://apps.apple.com/cn/app/${row.trackId}`"
            target="_blank"
            active-class="text-primary"
          >
            {{ row.trackId }}
          </ULink>
        </template>
        <template #actions-data="{ row }">
          <UButton color="green" variant="ghost" label="Download" />
        </template>
      </UTable>
      <div
        class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
      >
        <UPagination
          v-if="apps.length / PAGE_NUMBER > 1"
          v-model="page"
          :page-count="PAGE_NUMBER"
          :total="apps.length"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type App } from "~~/types"

const emit = defineEmits<{
  select: [row: App]
}>()

const props = defineProps<{
  apps: App[]
  loading?: boolean
}>()
const PAGE_NUMBER = 5
const page = ref(1)

const rows = computed(() => {
  return props.apps.slice(
    (page.value - 1) * PAGE_NUMBER,
    page.value * PAGE_NUMBER
  )
})
// const apps: App[] = [
//   {
//     trackId: 1,
//     title: "test",
//     description: "description",
//     category: "phone",
//     price: 123,
//   },
//   // More people...
// ]
const columns = [
  {
    key: "icon",
    label: "App Icon",
  },
  {
    key: "appName",
    label: "App Name",
    class: "sm:pl-0",
    rowClass: "!whitespace-normal sm:pl-0 sm:max-w-48",
  },
  {
    key: "latestVersion",
    label: "Latest Version",
    class: "hidden sm:table-cell",
    rowClass: "hidden sm:table-cell",
  },
  {
    key: "size",
    label: "Size",
    class: "hidden sm:table-cell",
    rowClass: "hidden sm:table-cell",
  },
  {
    key: "price",
    label: "Price",
    class: "hidden sm:table-cell",
    rowClass: "hidden sm:table-cell",
  },
  {
    key: "trackId",
    label: "App Id",
    class: "hidden sm:table-cell",
    rowClass: "hidden sm:table-cell text-green-500",
  },
]

function selectItem(row: App) {
  emit("select", row)
}
</script>
