'use strict';
var redis = require("redis");
var client = redis.createClient(6379);

client.on("error", function (err) {
  console.log("Error " + err);
});


module.exports.hello = (event, context, callback) => {  
  client.get('wife', function(err, res) {
    console.log(res); // => 'bar'

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "Your wife's name is !" + res        
      }),
    };

    callback(null, response);
  });
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
