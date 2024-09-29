import { DownloadProgress } from "~/types"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const taskId = query.taskId as string
  const progress: DownloadProgress | null = await useStorage(
    "download"
  ).getItem(taskId)

  if (progress) {
    console.log('🚀 ~ file: index.ts:11 ~ defineEventHandler ~ progress:', progress)
    return progress
  }
  throw createError({
    statusCode:408,
    statusMessage: "Not found task",
  })
})
