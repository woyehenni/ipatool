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

async function downloadFile(
  url: string,
  output: string,
  updateCallback: (downloaded: number, fileSize: number) => any
): Promise<number> {
  return new Promise((resolve, reject) => {
    get(url, (res) => {
      const writeStream = createWriteStream(output, {
        flags: "w",
      })
      const fs = parseInt(res.headers["content-length"] ?? "0", 10)
      let downloaded = 0

      res
        .on("data", (chunk) => {
          writeStream.write(chunk)
          downloaded += chunk.length
          updateCallback(downloaded, fs)
        })
        .on("end", () => {
          writeStream.end(() => {
            resolve(fs)
          })
        })
        .on("error", (err) => {
          reject(err)
        })
    })
  })
}

async function downloadWithProgress(
  taskId: string,
  url: string,
  output: string
): Promise<void> {
  let sts = {
    status: "downloading",
    progress: 0,
  }
  const fs = await downloadFile(
    url,
    output,
    async (downloaded: number, files: number) => {
      console.log(
        "🚀 ~ file: index.post.ts:53 ~ downloaded:",
        downloaded,
        files
      )
      sts.progress = Math.round((downloaded / files) * 100)
      await storage.setItem(taskId, sts)
    }
  )
  sts.progress = 100
  await storage.setItem(taskId, sts)
  console.log("🚀 ~ file: index.post.ts:53 ~ download finished")
}

async function sign(app: StoreItem, user: Account, file: string) {
  const sigClient = new SignatureClient(app, user.e)
  await sigClient.loadFile(file)
  await sigClient.appendMetadata().appendSignature()
  await sigClient.write()
}

async function run(
  trackId: string,
  output: string,
  app: StoreItem,
  user: Account,
  logger: Logger
) {
  const taskId = trackId
  try {
    await downloadWithProgress(taskId, app.URL, output)

    await storage.setItem(taskId, {
      status: "signing",
      progress: 100,
    })
    logger.info("Signing IPA")
    await sign(app, user, output)
    logger.info(`Saved IPA to ${output}`)
    await storage.setItem(taskId, {
      status: "complete",
      progress: 100,
      url: output.replace("./public", ""),
    })
  } catch (error: any) {
    await storage.setItem(taskId, {
      status: "failed",
      progress: 0,
      error: error.message,
    })
  }
}

export default defineEventHandler(async (event) => {
  const { trackId, externalVersionId } = await readBody(event)

  const logger = new Logger(LogLevel.INFO)

  logger.info("Logging in with provided information...")
  let _user = getCookie(event, "service")
  if (!_user) {
    logger.error('Authentication required. Run the "auth" subcommand.')
    return 1
  }
  const user = JSON.parse(_user) as Account
  logger.debug("Setting authentication cookies...")
  user.c.map((cookie: string) => {
    StoreClient.storeReq.cookieJar.setCookieSync(cookie, "https://apple.com")
  })

  logger.info(`Logged in as ${user.n}`)

  const identifier = trackId
  // const identifier = await getTrackId(country, deviceFamily, bundleId, trackId)
  // logger.debug(`Track ID: ${identifier}`)
  // if (!identifier) {
  //   logger.error(
  //     `Couldn\'t find app with given identifier ${bundleId ?? trackId}`
  //   )
  //   return 1
  // }

  try {
    logger.info("Obtaining a signed copy of the app...")
    const app = await StoreClient.item(
      String(identifier),
      user.d,
      externalVersionId
    )
    logger.info(
      `Found app ${app.metadata.bundleDisplayName} with version ${app.metadata.bundleShortVersionString}`
    )
    const config = useRuntimeConfig()
    const downloadPath = config.ipaDownloadPath
    const output = `${downloadPath}/${app.metadata.bundleDisplayName}_${app.metadata.bundleShortVersionString}.ipa`

    run(trackId, output, app, user, logger)
    return {
      taskId: trackId,
    }
  } catch (e: any) {
    let errorMsg = ""
    switch (e.failureType) {
      case StoreErrors.INVALID_COUNTRY: {
        errorMsg =
          "The country provided does not match your account. change country to supply a valid one."
        break
      }
      case StoreErrors.PASSWORD_TOKEN_EXPIRED: {
        errorMsg = "Login session expired. Login again."
        break
      }
      case StoreErrors.INVALID_ITEM: {
        errorMsg = "Received invalid store item."
        break
      }
      case StoreErrors.INVALID_LICENSE: {
        errorMsg =
          "Your Apple ID does not have a license for this app. Pleasee purchase."
        break
      }
      default: {
        if (e._state === "failure") {
          errorMsg = `Couldn't find app: ${e.customerMessage} (${e.failureType})`
          break
        } else {
          throw e
        }
      }
    }
    logger.error(errorMsg)
    throw createError({
      statusCode: 405,
      statusMessage: errorMsg,
    })
  }
})
