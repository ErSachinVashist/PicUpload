const fs = require('fs');
const gm = require('gm').subClass({imageMagick: true});
const perf = require('execution-time')();
const AWS = require('aws-sdk');
const config=require('../config')
let removeProp = require('js-remove-property');
let PushToQueue = require('./pushToQueue');
let s3 = new AWS.S3({apiVersion: '2006-03-01'});

module.exports = async function(message) {
  const picData = JSON.parse(message.Body);
  let orgPath = __dirname + `/original-pics/${picData.tempName}`,
    blurPath = __dirname + `/blur-pics/${picData.tempName}`,
    format100path = __dirname + `/100-thumb-pics/${picData.tempName}`,
    format200path = __dirname + `/200-thumb-pics/${picData.tempName}`;
  let finalObj=Object.assign({},picData);
  removeProp('base64Data', finalObj);
  console.log('')
  console.log('\x1b[32m%s\x1b[0m', 'Input Picture',picData.tempName);
  await makeOrgPic(orgPath, picData.base64Data, finalObj);
  await makeBlurPic(orgPath, blurPath,finalObj);
  await makeThumbPic('100',orgPath, format100path,finalObj);
  await makeThumbPic('200',orgPath, format200path,finalObj);
};

function makeOrgPic(orgPath, base64Data, finalObj) {
  return new Promise(function(resolve, reject) {
    perf.start();
    fs.writeFile(orgPath, base64Data, 'base64', function(err) {
      if (err) return console.log(err);
      console.log('PIC Added');
      let timeTaken=perf.stop()
      let obj={
        convertTime: timeTaken.time.toFixed(2),
        picType: 'original',
        ...finalObj
      }
      uploadToS3('original', 'original_'+finalObj.tempName, orgPath,obj, resolve)
    });
  })

}

function makeBlurPic(orgPath, blurPath,finalObj, next) {
  return new Promise(function(resolve, reject) {
    perf.start();
    gm(orgPath)
      .blur(7, 3)
      .write(blurPath, function(err) {
        if (err) return console.log(err);
        console.log('PIC Blurred');
        let timeTaken=perf.stop()

        let obj={
          convertTime: timeTaken.time.toFixed(2),
          picType: 'blurred',
          ...finalObj
        }

        uploadToS3('blurred', 'blurred_'+finalObj.tempName, blurPath,obj, resolve);
      });
  });
}

function makeThumbPic(dim, orgPath, destPath,finalObj, next) {
  return new Promise(function(resolve, reject) {
    perf.start();
    gm(orgPath)
      .resizeExact(dim, dim)
      .write(destPath, function(err) {
        if (err) return console.log('done');
        console.log('PIC Converted to',dim);
        let timeTaken=perf.stop()
        let obj={
          convertTime: timeTaken.time.toFixed(2),
          picType: 'x'+dim,
          ...finalObj
        }

        uploadToS3('x'+dim, 'x'+dim+'_'+finalObj.tempName, destPath,obj, resolve);
      });
  })
}

function uploadToS3(folder, name, imagePath,finalObj, next) {
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
      PushToQueue({...finalObj,url: uploadPic.Location, size: picObj.ContentLength,picType:folder},config.w2queue,next);
    });

  });
}
