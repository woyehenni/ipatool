import { DeviceFamily } from "../../ipatool/store-api/common/device-family"
import { Storefront } from "../../ipatool/store-api/common/storefront"
import { iTunesClient } from "../../ipatool/store-api/itunes/client"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  // return $fetch(`https://apis.bilin.eu.org/find/${query.q}`, {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   query: {
  //     // ...query,
  //     region: query.region,
  //   },
  // })
  const results = await iTunesClient.search(
    query.q as string,
    10,
    query.region as keyof typeof Storefront,
    query.platform as DeviceFamily
  )
  if (!results) {
    console.log("No results found.")
    return
  }
  return {
    data: results.map((item) => ({
      trackId: item.trackId,
      bundleId: item.bundleId,
      appName: item.trackName,
      icon: item.artworkUrl100,
      latestVersion: item.version,
      size: item.fileSizeBytes,
      price: item.formattedPrice,
      url: item.trackViewUrl
    })),
  }
})
