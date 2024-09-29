export interface LoadingStateInterface {
  loading: boolean
}

export const useLoadingStore = () =>
  useState<LoadingStateInterface>("loading", () => ({
    loading: false,
  }))
