var conf = require("../conf.js");
var mongoose = require('mongoose');

var connectionURL = "mongodb://mongo-db:"+conf.mongoDB.port+"/"+conf.mongoDB.name
//var connectionURL = "mongodb://localhost:27017/tradewave"

console.log(connectionURL)
mongoose.connect(
	connectionURL,
	{ 
		useNewUrlParser: true
	},
)
.then(() => console.log(`Connected to ${connectionURL}`))
.catch((error) => console.log(error));

module.exports = mongoose;