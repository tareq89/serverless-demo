'use strict';
const fs = require("fs");
const redis = require("redis");
const client = redis.createClient(6379);


client.on("error", function (err) {
  console.log("Error " + err);
});


exports.handler = function(event, context, callback) {
    //console.log(JSON.stringify(event, null, 2));
    event.Records.forEach(function(record) {
        // Kinesis data is base64 encoded so decode here
        var payload = new Buffer(record.kinesis.data, 'base64').toString('ascii');
        console.log('Decoded payload:', payload);
    });
    callback(null, "message");
};