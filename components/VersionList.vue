<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <UInput v-model="q" placeholder="Filter version" @input="page = 1" />
    </div>
    <div class="-mx-4 mt-8 sm:-mx-0">
      <UTable
        :loading
        :loading-state="{
          icon: 'i-heroicons-arrow-path-20-solid',
          label: 'Loading...',
        }"
        :progress="{ color: 'primary', animation: 'carousel' }"
        :columns="columns"
        :rows="rows.slice((page - 1) * PAGE_NUMBER, page * PAGE_NUMBER)"
      >
        <template #actions-data="{ row }">
          <UButton
            color="green"
            variant="ghost"
            label="Download"
            @click="$emit('download', row)"
          />
        </template>
      </UTable>
      <div
        class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
      >
        <UPagination
          v-if="rows.length / PAGE_NUMBER > 1"
          v-model="page"
          :page-count="PAGE_NUMBER"
          :total="rows.length"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Version } from "~~/types"

const props = defineProps<{
  versions: Version[]
  loading?: boolean
}>()
defineEmits<{
  download: [version: Version]
}>()

const PAGE_NUMBER = 5
const page = ref(1)
const q = ref("")

const rows = computed(() => {
  if (!q.value) {
    return props.versions
  }

  return props.versions.filter((item) => {
    return item.bundle_version.includes(q.value)
  })
})
const columns = [
  {
    key: "bundle_version",
    label: "Version",
  },
  {
    key: "external_identifier",
    label: "External Identifier",
    sortable: true,
    sort: (_first: any, _second: any, type: "asc" | "desc") => {
      props.versions.sort((a, b) =>
        type === "asc"
          ? Number(a.external_identifier) - Number(b.external_identifier)
          : Number(b.external_identifier) - Number(a.external_identifier)
      )
      return 0
    },
  },
  {
    key: "created_at",
    label: "Date",
    class: "hidden sm:table-cell",
    rowClass: "hidden sm:table-cell whitespace-normal",
  },
  {
    key: "actions",
    class: "sm:pr-0",
    rowClass: "text-right sm:pr-0",
  },
]
</script>
