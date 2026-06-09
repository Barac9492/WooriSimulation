// Minimal config. Loads the real index.html via file:// in headless Chromium.
module.exports = {
  testDir: '.',
  timeout: 45000,
  use: { headless: true },
  reporter: [['list']]
};
