const AWS = require('aws-sdk');
const config=require('../config')
AWS.config.update(config.awsConfig);
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
module.exports = function(messageObj, queue, cb) {
  const params = {
    MessageBody: JSON.stringify(messageObj),
    QueueUrl: queue,
  };
  sqs.sendMessage(params, (err, data) => {
    if (err) console.log(err);
    console.log('\x1b[36m%s\x1b[0m', `Sent to ${queue} : `, err?'NO':'YES');
    if(cb){
      cb(err);
    }
  });

};
