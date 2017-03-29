'use strict';
const fs = require("fs");
const redis = require("redis");
const client = redis.createClient(6379);


client.on("error", function (err) {
  console.log("Error " + err);
});


module.exports.handler = (event, context, callback) => {  
    console.log(event.body)
    const message = JSON.parse(event.body).message;

    var _message = message.toString().toLowerCase();
    var keyWordExist = _message.includes("amazon"||"lambda"||"dynamodb");
    var amazonKeywordExist = _message.includes("amazon");

    if (keyWordExist) {
        var messagesToBePurged = client.lrange("messagelist", 0, -1);
        messagesToBePurged = JSON.stringify(messagesToBePurged);

        fs.writeFile('message.txt', messagesToBePurged, (err) => {
            if (err) throw err;            
            console.log('The file has been saved!');

            client.del("messagelist");
            if (amazonKeywordExist) {
                // TODO: send push notification
            }            

            client.rpush("messagelist", message);
            const response = {
              statusCode: 201      
            };
            callback(null, response);
        });
    } else {
        client.rpush("messagelist", message);
        const response = {
          statusCode: 201      
        };
        callback(null, response);
    }



    
    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
}