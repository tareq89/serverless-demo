'use strict';
var redis = require("redis");
var client = redis.createClient(6379);

client.on("error", function (err) {
  console.log("Error " + err);
});



module.exports.handler = (event, context, callback) => {

    const response = {
        statusCode: 200,
        body: JSON.stringify("All messages")
    };

    callback(null, response);
}

