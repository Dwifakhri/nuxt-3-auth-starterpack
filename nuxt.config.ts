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
  site: {
    indexable: process.env.ENV_MODE === "production",
  },
  sitemap: {
    sitemaps: {
      pages: {
        urls: ["/", "/guest"].map((item) => ({
          loc: item,
          priority: 0.5,
          changefreq: "weekly",
          lastmod: new Date().toISOString(),
        })),
      },
      blogs: {
        urls: async () => {
          try {
            const response = await fetch(
              `${process.env.BE_API_URL}api/sitemap`
            );

            if (response.status !== 200) {
              console.error(response.json());
              return [];
            }

            const res: any = await response.json();
            const arc = res.route.map((item: any) => ({
              url: `/blog/${item}`,
              priority: 0.5,
              changefreq: "weekly",
              lastmod: new Date().toISOString(),
            }));
            return arc;
          } catch (error) {
            return [];
          }
        },
      },
    },
    exclude: ["/login"],
  },
  robots: {
    groups: [
      {
        userAgent: "*",
        disallow: ["/login"],
        comment: ["Disabled specific URL"],
      },
      {
        userAgent: "*",
        disallow: ["/*?u=", "/*?d="],
        comment: ["Disabled query string"],
      },
      {
        userAgent: "*",
        disallow: ["/package.json"],
        comment: ["Disabled common files"],
      },
    ],
    sitemap: [`${process.env.FE_APP_URL}sitemap.xml`],
  },
});
