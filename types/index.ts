export interface App {
  trackId: number
  bundleId: string
  appName: string
  icon: string
  latestVersion: string
  size: string
  price: string
}

export interface Version {
  trackId: number
  bundle_version: string
  external_identifier: string
  created_at: string
}

export type AppleApiFailed = {
  failureType: string
  customerMessage: string
}
export type AppleLoginSuccess = {
  passwordToken: string
  accountInfo: {
    appleId: string
    address: {
      firstName: string
      lastName: string
    }
  }
  dsPersonId: string
}

export type AppSongInfo = {
  URL: string
  sinfs: any[]
  metadata: {
    bundleDisplayName: string
    bundleShortVersionString: string
  }
}

export type AppleLoginResponse = AppleApiFailed | AppleLoginSuccess

export type DownloadProgress = {
  status: "downloading" | "signing" | "complete" | "failed"
  progress: number
  url?: string
  error?: string
}
