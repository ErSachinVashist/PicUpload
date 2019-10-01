const {Consumer} = require('sqs-consumer');
const AWS = require('aws-sdk');
const config = require('../config');
let worker1 = require('./w1_createVersionToS3');
AWS.config.update(config.awsConfig);
console.log('\x1b[36m%s\x1b[0m', 'Worker Queue Started');
const resQueue = Consumer.create({
  queueUrl:config.w1queue,
  region: 'ap-south-1',
  sqs: new AWS.SQS({apiVersion: '2012-11-05'}),
  handleMessage: worker1,
});

resQueue.on('error', (err) => {
  console.error(err.message);
});

resQueue.on('processing_error', (err) => {
  console.error(err.message);
});

resQueue.start();
