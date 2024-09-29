import { createWriteStream } from "fs"
import { get } from "https"
import { StoreClient } from "../../ipatool/store-api/store/client"
import { SignatureClient } from "../../ipatool/store-api/signature/client"
import { Storefront } from "../../ipatool/store-api/common/storefront"
import { DeviceFamily } from "../../ipatool/store-api/common/device-family"
import { StoreErrors, StoreItem } from "../../ipatool/store-api/store/response"
import { Logger, LogLevel } from "../../ipatool/utils/logger"
import { Account, getTrackId } from "../../ipatool/utils/misc"

const storage = useStorage("download")

function download(taskId: string) {
  return new Promise((resolve) => {
    let sts = {
      status: "downloading",
      progress: 0,
    }
    const timerId = setInterval(async () => {
      sts.progress += 10
      if (sts.progress >= 100) {
        sts.progress = 100
        clearInterval(timerId)
        await storage.setItem(taskId, sts)
        resolve({})
      }
      await storage.setItem(taskId, sts)
    }, 2000)
  })
}

async function run(taskId: string) {
  const logger = new Logger(LogLevel.INFO)

  logger.info("Logging in with provided information...")

  await download(taskId)
  await storage.setItem(taskId, {
    status: "signing",
    progress: 100,
  })
  logger.info("Signing IPA")

  const config = useRuntimeConfig()
  const downloadPath = config.ipaDownloadPath
  const output = `${downloadPath}/途虎养车_6.92.0.ipa`
  await storage.setItem(taskId, {
    status: "complete",
    progress: 100,
    url: output,
  })
  logger.info(`Saved IPA to ${output}`)
}

export default defineEventHandler(async (event) => {
  const { appleId, appId: trackId, externalVersionId } = await readBody(event)

  try {
    const taskId = trackId

    await storage.setItem(taskId, {
      status: "downloading",
      progress: 0,
    })

    run(taskId)
    return {
      taskId,
    }
  } catch (e: any) {}
})
