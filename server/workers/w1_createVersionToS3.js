const fs = require('fs');
const gm = require('gm').subClass({imageMagick: true});
const perf = require('execution-time')();
const config=require('../../config')
let removeProp = require('js-remove-property');
let PushToQueue = require('./queueActions/pushToQueue');
let DeleteFromQueue = require('./queueActions/deleteFromQueue');
const AWS = require('aws-sdk');
AWS.config.update(config.awsConfig);

let s3 = new AWS.S3({apiVersion: '2006-03-01'});

module.exports = function(picData,queueData, sqs) {
  let fileName = picData.tempName;
  let orgPath = __dirname + `/original-pics/${fileName}`,
    blurPath = __dirname + `/blur-pics/${fileName}`,
    format100path = __dirname + `/100-thumb-pics/${fileName}`,
    format200path = __dirname + `/200-thumb-pics/${fileName}`;

  makeOrgPic(orgPath, picData.base64Data, fileName, function(orgOutput) {
   PushToQueue(orgOutput,'tp-w2-queue')
    makeBlurPic(orgPath, blurPath,fileName,function(blurOutput) {
      PushToQueue(blurOutput,'tp-w2-queue')
      makeThumbPic('100',orgPath, format100path,fileName,function(dim100Output) {
        PushToQueue(dim100Output,'tp-w2-queue')
        makeThumbPic('200',orgPath, format200path,fileName,function(dim200Output) {
          PushToQueue(dim200Output,'tp-w2-queue')
          DeleteFromQueue(sqs, 'tp-w1-queue', queueData)
        })
      })
    })
  });
};

function makeOrgPic(orgPath, base64Data, fileName, next) {
  perf.start();
  fs.writeFile(orgPath, base64Data, 'base64', function(err) {
    if (err) return console.log(err);
    console.log('PIC Added');
    let obj={
      convertTime: perf.stop().words,
      picType: 'original',
      uploadStatus: 'done',
    }
    uploadToS3('original', fileName, orgPath, function(s3Out) {
      next({...obj,...s3Out});
    });
  });
}

function makeBlurPic(orgPath, blurPath,fileName, next) {
  perf.start();
  gm(orgPath)
    .blur(7, 3)
    .write(blurPath, function(err) {
      if (err) return console.log(err);
      console.log('PIC Blurred');
      let obj={
        convertTime: perf.stop().words,
        picType: 'blurred',
        uploadStatus: 'done',
      }
      uploadToS3('blurred', fileName, blurPath, function(s3Out) {
        next({...obj,...s3Out});
      });
    });
}

function makeThumbPic(dim, orgPath, destPath,fileName, next) {
  perf.start();
  gm(orgPath)
    .resizeExact(dim, dim)
    .write(destPath, function(err) {
      if (err) return console.log('done');
      console.log('PIC Converted to',dim);
      let obj={
        convertTime: perf.stop().words,
        picType: 'x'+dim,
        uploadStatus: 'done',
      }
      uploadToS3(dim+'-thumb', fileName, destPath, function(s3Out) {
        next({...obj,...s3Out});
      });

    });
}

function uploadToS3(folder, name, imagePath, next) {
  let s3params = {
    Bucket: 'tp-pics-bucket',
    Key: folder + '/' + name,
    Body: fs.readFileSync(imagePath),
  };
  s3.upload(s3params, function(err, uploadPic) {
    if (err) return console.log(err);
    removeProp('Body', s3params);
    s3.getObject(s3params, function(err, picObj) {
      if (err) return console.log(err);
      next({url: uploadPic.Location, size: picObj.ContentLength});
    });

  });
}
