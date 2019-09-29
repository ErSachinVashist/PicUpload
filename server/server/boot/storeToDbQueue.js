const { Consumer } = require('sqs-consumer');
const AWS = require('aws-sdk');
const config = require('../../config');
AWS.config.update(config.awsConfig);

module.exports=function(app) {
  console.log('\x1b[36m%s\x1b[0m', 'Consumer Queue Started');
  const resQueue = Consumer.create({
    queueUrl: 'https://sqs.ap-south-1.amazonaws.com/320112079756/tp-w2-queue',
    region:'ap-south-1',
    sqs: new AWS.SQS({apiVersion: '2012-11-05'}),
    handleMessage:(message => processMessage(message,app))
  });

  resQueue.on('error', (err) => {
    console.error(err.message);
  });

  resQueue.on('processing_error', (err) => {
    console.error(err.message);
  });
  resQueue.start();
}

function processMessage(message,app) {
  const picData = JSON.parse(message.Body);
  if (picData.picType === 'original') {
    app.models.Pictures.upsertWithWhere({pictureId: picData.pictureId}, picData, function(err, pic) {
      if (err) return console.log(err);
      gotAllPics(app,picData, function() {
      });
    });
  } else {
    app.models.Editpictures.create(picData, function(err, epic) {
      if (err) return console.log(err);
      gotAllPics(app,picData, function() {
      });
    });
  }
}

function gotAllPics(app,picData, cb) {
  app.models.Pictures.findById(picData.pictureId, {include: 'editpictures'}, function(err, pic) {
    if (err) return console.log(err);
    let jsonPicData=pic.toJSON()
    if (jsonPicData && jsonPicData.editpictures.length === 3 && jsonPicData.url) {
      pic.uploadStatus = 'done';
      pic.save(function(err, data) {
        if (err) return console.log(err);
        console.log('Added all pics for :', picData.tempName);
        cb();
      });
    } else {
      cb();
    }
  });

}
