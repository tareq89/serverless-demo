'use strict';


module.export.sendSNS = (message) => {
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
    console.log("SNS has been sent : " + message);
}