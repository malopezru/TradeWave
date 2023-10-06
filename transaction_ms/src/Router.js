var express = require("express");
var	modules = require("./modules/ModulesManager.js");
var router = express.Router();
				
var ExpressRouter = function(config){
	this.config = config || {};
	this.express = express();
	this.router = router;
}

ExpressRouter.prototype.routingModulesMethods = function(router){
	for (var module in modules){
		var concreteModuleJSON = modules[module];
		var moduleControllers = concreteModuleJSON.moduleControllers;
		
		for(var controller in moduleControllers){
			var moduleController = require(moduleControllers[controller].path);
			var urls = moduleControllers[controller].urls;
				moduleController = moduleController.prototype;
			
			for(var url in urls){				

				var getMethod = moduleController[urls[url].get];
				var postMethod = moduleController[urls[url].post];
				var putMethod = moduleController[urls[url].put];
				var deleteMethod = moduleController[urls[url].delete];

				if (getMethod != undefined)
					router.route(urls[url].url).get(getMethod);
				
				if (postMethod != undefined)
					router.route(urls[url].url).post(postMethod);

				if (putMethod != undefined)
					router.route(urls[url].url).put(putMethod);
				
				if (deleteMethod != undefined)			
					router.route(urls[url].url).delete(deleteMethod);					
				
			}
	    }
	}
}

module.exports = ExpressRouter;