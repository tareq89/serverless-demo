'use strict';
const fs = require("fs");
const redis = require("redis");
const client = redis.createClient(6379);

client.on("error", function (err) {
  console.log("Error " + err);
});


var AWS = require('aws-sdk');
AWS.config.region = 'eu-west-1';
var lambda = new AWS.Lambda();


const checkKeywordAndPurge = require("./../lib/checkKeywordAndPurge");


exports.handler = function(event, context, callback) {
    event.Records.forEach(function(record) {
        // Kinesis data is base64 encoded so decode here
        var payload = new Buffer(record.kinesis.data, 'base64').toString('ascii');
        console.log('Decoded payload:', payload);
        
        payload = JSON.parse(payload);
        console.log(payload)
        checkKeywordAndPurge(payload.message, ()=> {
        	if (payload.method === "POST") {
        		var params = {
				    FunctionName: 'post',
				    InvocationType: 'RequestResponse',
				    LogType: 'Tail',
				    Payload: payload
				};

				lambda.invoke(params, (err, data) => {
					if (err) {
						context.fail(err);
					} else {
						context.succeed("post returned : " + data.Payload);
					}
				})
        	} else if (payload.method === "PUT") {
        		var params = {
				    FunctionName: 'update',
				    InvocationType: 'RequestResponse',
				    LogType: 'Tail',
				    Payload: payload
				};

				lambda.invoke(params, (err, data) => {
					if (err) {
						context.fail(err);
					} else {
						context.succeed("put returned : " + data.Payload);
					}
				})
        	}
        })

    });
    callback(null, "message");
};