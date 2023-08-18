export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  fetch(
    "https://api.igdb.com/v4/games",
    { method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Client-ID': `${config.twitchClientID}`,
        'Authorization': `Bearer ${config.twitchAuthToken}`,
      },
      body: `fields name; search "${query.s}"; where version_parent = null; limit 10;`
    })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.error(err)
    })
})
