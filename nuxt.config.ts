// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  extends: [
    '@thombruce/tnt'
  ],
  runtimeConfig: {
    twitchClientID: process.env.CLIENT_ID,
    twitchAuthToken: process.env.AUTH_TOKEN
  }
})
