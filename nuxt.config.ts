// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      API_URL: process.env.BE_API_URL,
    },
  },
  app: {
    head: {
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/lock.png",
        },
      ],
    },
  },
  css: ["~/assets/css/index.css"],
  modules: ["@sidebase/nuxt-auth", "@nuxtjs/robots", "@nuxtjs/sitemap"],
  auth: {
    globalAppMiddleware: {
      isEnabled: false,
    },
    baseURL: process.env.BE_API_URL,
    provider: {
      type: "local",
      endpoints: {
        signIn: { path: "api/login", method: "post" },
        signOut: false,
        getSession: { path: "api/me", method: "get" },
      },
      pages: {
        login: "/login",
      },
      token: {
        signInResponseTokenPointer: "/jwt",
        secureCookieAttribute: false,
      },
    },
  },
  sitemap: {
    exclude: ["/"],
  },
  robots: {
    groups: [
      {
        userAgent: "*",
        disallow: ["/", "/login"],
        comment: "Disabled specific URL",
      },
    ],
    sitemap: `${process.env.FE_APP_URL}sitemap.xml`,
  },
});
