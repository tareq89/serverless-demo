'use strict';
var redis = require("redis");
var client = redis.createClient(6379);

client.on("error", function (err) {
  console.log("Error " + err);
});



module.exports.handler = (event, context, callback) => {
	var index = JSON.parse(event.body).index;
	var hardToImagineStringValue = "___TOBEDELETED__YOU_CANT_POSSIBLY_GUESS_THIS_VALUE***";
	client.lset("messagelist", index, hardToImagineStringValue, function (err, updatedMessage) {
		client.lrem("messagelist", 0, hardToImagineStringValue, function (err, success) {
			const response = {
		        statusCode: 200,
		        body: JSON.stringify("Message deleted")
		    };
		    callback(null, response);
		})
	})    
}

