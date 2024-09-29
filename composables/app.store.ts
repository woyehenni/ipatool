import type { App, AppleLoginSuccess, Version } from "~/types"

export interface AppsStateInterface {
  apps: App[]
  versions: Version[]
  loading: boolean
}

export const useAppStore = () =>
  useState<AppsStateInterface>("apps", () => ({
    apps: [],
    versions: [],
    loading: false,
  }))

export const searchApps = async (
  keyworld: string,
  region: string,
  platform?: string
) => {
  const appsStore = useAppStore()
  // const loadingStore = useLoadingStore()
  // loadingStore.value.loading = true
  appsStore.value.loading = true

  const { data, error, pending }: any = await useFetch("/api/apps/search", {
    params: { q: keyworld, region, platform },
  })
  // loadingStore.value.loading = pending.value
  appsStore.value.loading = pending.value
  if (data.value) {
    appsStore.value.apps = data.value.data
    appsStore.value.versions = []
  } else {
    throw createError(error.value.data)
  }
}

export const searchAppVersions = async (trackId: string) => {
  const appsStore = useAppStore()
  appsStore.value.loading = true
  const { data, error, pending }: any = await useFetch("/api/apps/version", {
    params: { trackId },
  })
  appsStore.value.loading = pending.value
  if (data.value) {
    appsStore.value.versions = (data.value.data as Version[]).map((item) => ({
      ...item,
      trackId: Number(trackId),
    }))
  } else {
    throw createError(error.value.data)
  }
}

export const downloadApp = async (version: Version) => {
  const appsStore = useAppStore()
  appsStore.value.loading = true
  const dsPersonId = useCookie("dsPersonId")
  const accountInfo = useCookie("account")
  const { data, error, pending }: any = await useFetch("/api/download", {
    method: "POST",
    body: {
      appleId: (
        accountInfo!.value as unknown as AppleLoginSuccess["accountInfo"]
      ).appleId,
      trackId: version.trackId,
      externalVersionId: version.external_identifier,
      dsPersonId,
    },
  })
  appsStore.value.loading = pending.value
  if (data.value) {
    console.log(
      "🚀 ~ file: app.store.ts:64 ~ downloadApp ~ data.value:",
      data.value
    )
    return {
      taskId: data.value.taskId as string,
    }
  } else {
    setError(error.value)
  }
}

export const getProgress = async (taskId: string) => {
  const { data, error, pending }: any = await useFetch("/api/progress", {
    params: { taskId },
  })
  if (data.value) {
    return data.value
  } else {
    throw createError(error.value.data)
  }
}

export const resetApps = () => {
  const appsStore = useAppStore()
  appsStore.value.loading = false
  appsStore.value.apps = []
  appsStore.value.versions = []
}
