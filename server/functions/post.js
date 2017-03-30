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
    var keyWordExist = _message.includes("amazon") || _message.includes("lambda") || _message.includes("dynamodb");
    var amazonKeywordExist = _message.includes("amazon");

    if (keyWordExist) {
        client.lrange("messagelist", 0, -1, function (err, allmessages) {            

            var allmessagesLength = allmessages.length;
            for (var i = 0; i < allmessagesLength; i++) {
                allmessages[i] = allmessages[i].substr(10); // remove the user session hash
            }

            var messagesToBePurged = JSON.stringify(allmessages);
            fs.writeFile('message.txt', messagesToBePurged, (err) => {
                if (err) throw err;            
                console.log('The file has been saved!');
                client.del("messagelist");
                if (amazonKeywordExist) {
                    // TODO: send push notification
                    // var sns = new AWS.SNS({apiVersion: '2010-03-31'});
                    // var params = {
                    //   Message: 'STRING_VALUE', /* required */
                    //   MessageAttributes: {
                    //     someKey: {
                    //       DataType: 'STRING_VALUE', /* required */
                    //       BinaryValue: new Buffer('...') || 'STRING_VALUE',
                    //       StringValue: 'STRING_VALUE'
                    //     },
                    //     /* anotherKey: ... */
                    //   },
                    //   MessageStructure: 'STRING_VALUE',
                    //   PhoneNumber: 'STRING_VALUE',
                    //   Subject: 'STRING_VALUE',
                    //   TargetArn: 'STRING_VALUE',
                    //   TopicArn: 'STRING_VALUE'
                    // };
                    // sns.publish(params, function(err, data) {
                    //   if (err) console.log(err, err.stack); // an error occurred
                    //   else     console.log(data);           // successful response
                    // });

                }
                client.rpush("messagelist", message);
                const response = {
                  statusCode: 201      
                };
                callback(null, response);
            });
        });
        
    } else {
        client.rpush("messagelist", message);
        const response = {
          statusCode: 201      
        };
        callback(null, response);
    }
}