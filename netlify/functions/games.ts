const API_ENDPOINT = "https://api.igdb.com/v4/games"

exports.handler = async (event: any, context: any, callback: any) => {
  try {
    var body = JSON.parse(event.body)
    const response = await fetch(API_ENDPOINT,
      { method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Client-ID': `${process.env.TWITCH_CLIENT_ID}`,
          'Authorization': `Bearer ${process.env.TWITCH_AUTH_TOKEN}`,
        },
        body: `fields name, first_release_date; search "${body.query}"; where version_parent = null & category = 0; limit 50;`
      }
    )
    const data = await response.json()
    return { statusCode: 200, body: JSON.stringify(data) }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    }
  }
}
