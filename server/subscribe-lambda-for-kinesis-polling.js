const run = require('@rabblerouser/local-kinesis-lambda-runner');
const lambda = require('./functions/stream').handler;
console.log(lambda)
run(lambda);