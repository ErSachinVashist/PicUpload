const AWS = require('aws-sdk');
const config=require('../../config')
AWS.config.update(config.awsConfig);
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
module.exports = function(messageObj, queue, cb) {
  const params = {
    MessageBody: JSON.stringify(messageObj),
    QueueUrl: `https://sqs.ap-south-1.amazonaws.com/320112079756/${queue}`,
  };
  sqs.sendMessage(params, (err, data) => {
    if (err) return console.log('Error', err);
    console.log('Sent to queue', queue);
    if(cb){
      cb(data.MessageId);
    }
  });

};
