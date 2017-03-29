'use strict';
var redis = require("redis");
var client = redis.createClient(6379);

client.on("error", function (err) {
  console.log("Error " + err);
});

module.exports.handler = (event, context, callback) => {

    var index = JSON.parse(event.body).index;
	var newMessage = JSON.parse(event.body).newMessage;
	client.lset("messagelist", index, newMessage, function (err, updatedMessage) {		
		const response = {
	        statusCode: 200,
	        body: JSON.stringify("Message updated")
	    };
	    callback(null, response);		
	})   
}

