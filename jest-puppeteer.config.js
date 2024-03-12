module.exports = {
  server: {
    command: 'pnpm start:examples',
    port: 3001,
    host: 'localhost',
    protocol: 'http',
    debug: true,
    launchTimeout: 60000,
    usedPortAction: 'kill',
  },
};
