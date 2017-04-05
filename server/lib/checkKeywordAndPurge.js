'use strict';
const fs = require("fs");
const redis = require("redis");
const client = redis.createClient(6379);
const SNS = require('./sendSNS');


client.on("error", function (err) {
  console.log("Error " + err);
});


module.exports.checkAndpurge = (message, callback) => {
	var _message = message.toString().toLowerCase();
    var keyWordExist = _message.includes("amazon") || _message.includes("lambda") || _message.includes("dynamodb");
    var amazonKeywordExist = _message.includes("amazon");

    if (keyWordExist) {
        client.lrange("messagelist", 0, -1, function (err, allmessages) {            

            var allmessagesLength = allmessages.length;
            for (var i = 0; i < allmessagesLength; i++) {
                allmessages[i] = allmessages[i].substr(10); // remove the user session hash
            }

            var messagesToBePurged = JSON.stringify(allmessages);
            fs.readFile('message.json', function (err, data) {
                if (err) { 
                    console.log(err);
                } else {                    
                    var messages = JSON.parse(data);
                    var timeStamp = Math.floor(Date.now() / 1000);
                    messages[timeStamp] = messagesToBePurged;
                    var messages = JSON.stringify(messages);
                    fs.writeFile('message.json', messages, (err) => {
                        if (err) throw err;
                        client.del("messagelist");
                        if (amazonKeywordExist) {
                            SNS.sendSNS(message);
                        }
                        callback();
                    });
                }    
            }); 
            
        });        
    } else {
        callback();
    }
}