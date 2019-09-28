const fs = require('fs');
const gm = require('gm').subClass({imageMagick: true});
const perf = require('execution-time')();
var removeProp = require('js-remove-property');

const AWS = require('aws-sdk');
AWS.config.update({
  region: 'ap-south-1',
  accessKeyId: 'AKIAUVCBKWOGDNLDAUOB',
  secretAccessKey: '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',

});
let s3 = new AWS.S3({apiVersion: '2006-03-01'});
let s3params = {
  Bucket: 'tp-pics-bucket',
  Key:'original/test.png',
  Body:fs.readFileSync('/home/myuser/Desktop/personal/project/project1/server/server/custom_modules/pictures/original-pics/org_1569612214818.png')
};
perf.start()
s3.upload(s3params, function(err, data) {
  if(err) return console.log(err)
  removeProp('Body', s3params);
  s3.getObject(s3params, function(err, data2) {
    if(err) return console.log(err)
    data.size=data2.ContentLength
    console.log(perf.stop())
    console.log(data)
  });
});

