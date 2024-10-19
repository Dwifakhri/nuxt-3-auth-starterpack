import { defineVitestConfig } from "@nuxt/test-utils/config"

export default defineVitestConfig({
  test: { environment: "jsdom" },
  // any custom Vitest config you require
})
