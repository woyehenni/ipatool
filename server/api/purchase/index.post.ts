import { StoreClient } from "../../ipatool/store-api/store/client"
import { SignatureClient } from "../../ipatool/store-api/signature/client"
import { Storefront } from "../../ipatool/store-api/common/storefront"
import { DeviceFamily } from "../../ipatool/store-api/common/device-family"
import { StoreErrors, StoreItem } from "../../ipatool/store-api/store/response"
import { Logger, LogLevel } from "../../ipatool/utils/logger"
import { Account, getTrackId } from "../../ipatool/utils/misc"

export default defineEventHandler(async (event) => {
  const { trackId, country, deviceFamily, bundleId } = await readBody(event)

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

  const identifier = await getTrackId(country, deviceFamily, bundleId, trackId)
  logger.debug(`Track ID: ${identifier}`)
  if (!identifier) {
    logger.error(
      `Couldn\'t find app with given identifier ${bundleId ?? trackId}`
    )
    return 1
  }

  try {
    logger.info(`Obtaining a license for ${identifier} from the App Store...`)
    const app = await StoreClient.purchase(
      String(identifier),
      user.d,
      user.p,
      country
    )
    logger.debug(JSON.stringify(app, null, 2))
    logger.info("Done.")
  } catch (e: any) {
    if (e._state === "failure") {
      switch (e.failureType) {
        case StoreErrors.PRICE_MISMATCH: {
          logger.error("A license already exists for this item.")
          break
        }
        case StoreErrors.INVALID_COUNTRY: {
          logger.error(
            "The country provided does not match your account. Use the -c, --country flag to supply a valid one."
          )
          break
        }
        case StoreErrors.PASSWORD_TOKEN_EXPIRED: {
          logger.error("Login session expired. Login again.")
          break
        }
        case StoreErrors.PASSWORD_CHANGED: {
          logger.error("Your password has changed.")
          break
        }
        default: {
          throw e
        }
      }
    } else {
      if (
        e.message === "The Apple ID already contains a license for this app."
      ) {
        logger.error(e.message)
      } else {
        throw e
      }
    }
  }
})
