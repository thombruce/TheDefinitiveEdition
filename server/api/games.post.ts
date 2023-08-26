const API_ENDPOINT = "https://api.igdb.com/v4/games"

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = JSON.parse(await readBody(event))

  const response = await fetch(API_ENDPOINT,
    { method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Client-ID': `${config.twitchClientID}`,
        'Authorization': `Bearer ${config.twitchAuthToken}`,
      },
      body: `
        fields name, release_dates.y, release_dates.platform.abbreviation;
        search "${body.query}";
        where version_parent = null & category = 0;
        limit 50;
      `
    }
  )

  const data = await response.json()

  return data
})
