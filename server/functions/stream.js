'use strict';
const fs = require("fs");
const redis = require("redis");
const client = redis.createClient(6379);


client.on("error", function (err) {
  console.log("Error " + err);
});

// // Connect to kinesis when runinng this file as a standalone
// const AWS = require('aws-sdk')
// const kinesis = new AWS.Kinesis({endpoint: 'http://localhost:4567', region: "us-east-1", credentials: {accessKeyId: "asdasdasdasdas", secretAccessKey: "asdadsdasdwqerefwefewf"}})
// kinesis.listStreams(console.log.bind(console));


// var getSharrdParams = {
//   ShardId: 'shardId-0', /* required */
//   ShardIteratorType: "LATEST", /* required */
//   StreamName: 'statup', /* required */  
// };
// kinesis.getShardIterator(getSharrdParams, function(err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else {
//   	console.log(data);
//   	// Reading onetime kinesis stream!
// 	var getRecordsParams = {
// 	  ShardIterator: data.ShardIterator, /* required */
// 	  Limit: 50
// 	};
// 	kinesis.getRecords(getRecordsParams, function(err, data) {
// 	  if (err) console.log(err, err.stack); // an error occurred
// 	  else     console.log(data);           // successful response
// 	});
//   } // successful response
// });


exports.handler = function(event, context, callback) {
    //console.log(JSON.stringify(event, null, 2));
    event.Records.forEach(function(record) {
        // Kinesis data is base64 encoded so decode here
        var payload = new Buffer(record.kinesis.data, 'base64').toString('ascii');
        console.log('Decoded payload:', payload);
    });
    callback(null, "message");
};