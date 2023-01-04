// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["vuetify/lib/styles/main.css", "~/assets/css/main.css"],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
    ssr: {
      noExternal: ["vuetify"], // add the vuetify vite plugin
    },
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_APP_API_URL,
      WEATHER_API_KEY: process.env.NUXT_APP_WEATHER_API_KEY,
    },
  },
});
