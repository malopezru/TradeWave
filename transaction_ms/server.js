const https = require("http");
const conf = require("./conf.js");
const ExpressServer = require('./src/ExpressServer');

require('./src/DBConnection');

const app = new ExpressServer();
const server = https.createServer(app.expressServer);

server.listen(conf.port, () => {
  console.log(`Express.js server is running on port ${conf.port}`);
});

process.on('unhandledRejection', (reason) => {
  console.log('Unhandled Rejection at:', reason.stack || reason)
})
