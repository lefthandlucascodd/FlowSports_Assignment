const { defineConfig } = require('cypress')

const DEFAULT_TIMEOUT = 30000
const PAGE_LOAD_TIMEOUT = 60000

module.exports = defineConfig({
  e2e: {
    browser: 'chrome',
    baseUrl: 'https://www.flowrestling.org',
    defaultCommandTimeout: DEFAULT_TIMEOUT,
    pageLoadTimeout: PAGE_LOAD_TIMEOUT,
    screenshotOnRunFailure: false,
    chromeWebSecurity: false,
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
}) 