import { StoreClient } from "../../ipatool/store-api/store/client"
import {
  StoreAuthResponse,
  StoreFailureResponse,
} from "../../ipatool/store-api/store/response"
import { Logger, LogLevel } from "../../ipatool/utils/logger"

export default defineEventHandler(async (event) => {
  const { email, password, mfa } = await readBody(event)

  const logger = new Logger(LogLevel.INFO)

  logger.info("Logging in with provided information...")
  const user = await _login(email, password, mfa)
  if (user._state === "failure") {
    logger.error(
      `Couldn't log in: ${user.customerMessage} (${user.failureType})`
    )
    throw createError({
      statusCode: 405,
      statusMessage: `Couldn't log in: ${user.customerMessage} (${user.failureType})`,
      data: {
        failureType: user.failureType
      }
    })
  }
  logger.info(
    `Logged in as ${user.accountInfo.address.firstName} ${user.accountInfo.address.lastName}`
  )
  const userinfo = {
    n: `${user.accountInfo.address.firstName} ${user.accountInfo.address.lastName}`,
    e: email,
    p: user.passwordToken,
    d: user.dsPersonId,
    c: StoreClient.storeReq.cookieJar.getSetCookieStringsSync(
      "https://apple.com",
      { allPaths: true }
    ),
  }
  logger.debug(JSON.stringify(userinfo))
  logger.info('Saved authentication info to Cookies.');
  setCookie(event, "service", JSON.stringify(userinfo))

  return {
    accountInfo: user.accountInfo,
    email,
    accessToken: user.passwordToken,
  }
})

async function _login(
  email: string,
  password: string,
  mfa?: string
): Promise<StoreAuthResponse | StoreFailureResponse> {
  try {
    return await StoreClient.authenticate(email, password, mfa)
  } catch (e: any) {
    return e
  }
}
