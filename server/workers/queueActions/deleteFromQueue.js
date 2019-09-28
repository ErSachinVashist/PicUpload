
module.exports = function(sqs, queue, queueData, cb) {
  const deleteParams = {
    QueueUrl: `https://sqs.ap-south-1.amazonaws.com/320112079756/${queue}`,
    ReceiptHandle: queueData.Messages[0].ReceiptHandle,
  };
  sqs.deleteMessage(deleteParams, (err, data) => {
    if (err) return console.log(err, err.stack);
    console.log('Successfully deleted message from queue');
    if(cb){
      cb();
    }
  });
};
