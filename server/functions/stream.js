'use strict';
const fs = require("fs");
const redis = require("redis");
const client = redis.createClient(6379);

const postFn = require("./post");
const updateFn = require("./update");

var lambdaPost = require('lambda-wrapper').wrap(postFn);
var lambdaUpdate = require('lambda-wrapper').wrap(updateFn);

client.on("error", function (err) {
  console.log("Error " + err);
});

const check = require("./../lib/checkKeywordAndPurge");

exports.handler = function(event, context, callback) {
    event.Records.forEach(function(record) {    	
        // Kinesis data is base64 encoded so decode here
        var payload = new Buffer(record.kinesis.data, 'base64').toString('ascii');
        console.log('Decoded payload:', payload);
        
        payload = JSON.parse(payload);        
        check.checkAndurge(payload.message, ()=> {        	
        	if (payload.method === "POST") {        		
				payload = JSON.stringify(payload);
				var _event = {body: payload};
				lambdaPost.run(_event, function (err, data) {
					if (err) {
						console.log(err);
					} else {
						console.log("post returned : " + data.Payload);
					}
					callback(null, "message");
				})				
        	} else if (payload.method === "PUT") {
        		payload = JSON.stringify(payload);
        		var _event = {body: payload};
				lambdaUpdate.run(_event, function (err, data) {
					if (err) {
						console.log(err);
					} else {
						console.log("post returned : " + data.Payload);
					}
					callback(null, "message");
				})				
        	}
        })

    });    
};