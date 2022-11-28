const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://demo.podium.tools/qa-webchat-lorw",
  },
  video: false,
  retries: {
    runMode: 1,
    openMode: 0
  },
});
