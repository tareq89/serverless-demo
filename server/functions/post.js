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
    client.rpush("messagelist", message);
        const response = {
          statusCode: 201      
        };
    callback(null, response);    
}