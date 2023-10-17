const https = require("http");
const conf = require("./conf.js");
const ExpressServer = require('./src/ExpressServer');

require('./src/DBConnection');

const app = new ExpressServer();
const server = https.createServer(app.expressServer);

const PORT = conf.port || 5000;

server.listen(PORT, () => {
  console.log(`Express.js server is running on port ${PORT}`);
});

process.on('unhandledRejection', (reason) => {
  console.log('Unhandled Rejection at:', reason.stack || reason)
})
