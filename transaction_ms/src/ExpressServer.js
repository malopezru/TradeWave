const bodyParser = require("body-parser")
var Router = require("./Router");

Router = new Router();

var ExpressServer = function () {
    this.expressServer = Router.express;
    this.expressRouter = Router.router;
    //middlewares
    this.expressServer.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Cache-Control, Authorization"
      );
      res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
      next();
    });
  
    this.expressServer.use(bodyParser.urlencoded({ extended: false }));
    this.expressServer.use(bodyParser.json());
    Router.routingModulesMethods(this.expressRouter);
    this.expressServer.use("", require("express").static("./"));
    this.expressServer.use("", this.expressRouter);
};
  
  module.exports = ExpressServer;