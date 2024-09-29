export default defineEventHandler((event) => {
  const query = getQuery(event)
  return $fetch(`https://apis.bilin.eu.org/history/${query.trackId}`, {
    headers: {
      "Content-Type": "application/json",
    },
    query: {},
  })
})
