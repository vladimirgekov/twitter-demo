export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "demo",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  publicRuntimeConfig: {
    axios: {
      baseURL: "https://rickandmortyapi.com/api"
    }
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios"],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  modules: [
    [
      "@nuxtjs/firebase",
      {
        config: {
          apiKey: "AIzaSyC6SHF3MHstNvWfWGHqAm_bS_Sj-TwWd34",
          authDomain: "twitter-9d6d5.firebaseapp.com",
          projectId: "twitter-9d6d5",
          storageBucket: "twitter-9d6d5.appspot.com",
          messagingSenderId: "185212939527",
          appId: "1:185212939527:web:90ffb2fa873f0d65eaa9a2",
          measurementId: "G-0P7CELQBMK"
        },
        services: {
          auth: true
        }
      }
    ]
  ]
};
