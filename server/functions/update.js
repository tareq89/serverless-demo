'use strict';
var redis = require("redis");
var client = redis.createClient(6379);

client.on("error", function (err) {
  console.log("Error " + err);
});

module.exports.handler = (event, context, callback) => {

	console.log("THIS IS FROM UPDATE : " + event.body)
    var index = JSON.parse(event.body).index;
	var message = JSON.parse(event.body).message;
	client.lset("messagelist", index, message, function (err, updatedMessage) {		
		const response = {
	        statusCode: 200,
	        body: JSON.stringify("Message updated")
	    };
	    callback(null, response);		
	})   
}

