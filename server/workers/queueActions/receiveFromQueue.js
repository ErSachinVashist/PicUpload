const AWS = require('aws-sdk');
let each = require('async-each-series');
let worker1 = require('../w1_createVersionToS3');
let worker2 = require('../w2_storeDetailsToRedis');

const config=require('../../config');
AWS.config.update(config.awsConfig);

let params = {
  MaxNumberOfMessages: 1,
  VisibilityTimeout: 0,
  WaitTimeSeconds: 10,
};

const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
const queues=['tp-w1-queue','tp-w2-queue'];

each(queues,function(queue,next) {
  params.QueueUrl=`https://sqs.ap-south-1.amazonaws.com/320112079756/${queue}`;
  sqs.receiveMessage(params, (err, queueData) => {
    if (err) return console.log('Error', err);
    if (!queueData.Messages) {
      return console.log('Nothing to process in queue :',queue);
    }
    const picData = JSON.parse(queueData.Messages[0].Body);
    switch (queue) {
      case 'tp-w1-queue': worker1(picData,queueData,sqs);break;
      // case 'tp-w2-queue': worker2(queueData,datasqs);break;
      default : console.log('New Queue Found :',queue)//
    }
    next()
  });
},function(err) {
  if(err) return console.log(err)
  console.log('QUEUES started >>>>>>>>>>>>>>>>')
})
