// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  extends: [
    '@thombruce/tnt-content'
  ],
  runtimeConfig: {
    twitchClientID: process.env.TWITCH_CLIENT_ID,
    twitchAuthToken: process.env.TWITCH_AUTH_TOKEN
  },
  content: {
    documentDriven: {
      globals: {
        theme: {
          where: {
            _id: 'content:_theme.yml'
          },
          without: ['_']
        }
      },
      layoutFallbacks: ['theme'],
    },
  }
})
