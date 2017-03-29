'use strict';
var AWS = require('aws-sdk');
var dynamo = new AWS.DynamoDB({endpoint: 'http://localhost:4567'})

module.exports.hello = (event, context, callback) => {  

  dynamo.listTables(function(err, data) {
    // console.log(data.TableNames);
    const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      table: data
      // input: event,
    }),
  };

  callback(null, response);
  });
  

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
