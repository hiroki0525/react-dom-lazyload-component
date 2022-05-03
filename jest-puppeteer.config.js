module.exports = {
  server: {
    command: 'npm run -w examples start',
    port: 3001,
    host: 'localhost',
    protocol: 'http',
    debug: true,
    launchTimeout: 60000,
    usedPortAction: 'kill',
  },
};
