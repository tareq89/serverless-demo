'use strict';
var redis = require("redis");
var client = redis.createClient(6379);

client.on("error", function (err) {
  console.log("Error " + err);
});



module.exports.handler = (event, context, callback) => {

    client.lrange("messagelist", 0, -1, function(err, allMessages) {
        if (err) {
            const response = {
                statusCode: 500,
                body: JSON.stringify("Internal error occured!")
            };
            callback(null, response);
        } else {
            const response = {
                statusCode: 200,
                body: JSON.stringify(allMessages)
            };
            callback(null, response);
        }
    });
    
}

