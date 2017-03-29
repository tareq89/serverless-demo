'use strict';
var redis = require("redis");
var client = redis.createClient(6379);

client.on("error", function (err) {
  console.log("Error " + err);
});


module.exports.handler = (event, context, callback) => {  
    console.log(event.body)
    const message = JSON.parse(event.body).message;   
    const response = {
      statusCode: 201,
      body: JSON.stringify(message),
    }; 
    callback(null, response);
    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
}