const AWS = require('aws-sdk');
const app = require('../../server');
let each=require('async-each-series');
let removeProp = require('js-remove-property');
let s3 = new AWS.S3({apiVersion: '2006-03-01'});
const params={
  Bucket: 'tp-pics-bucket',
  Expires: 60 * 5
}
let error1 = new Error('No Picture Found with this Id');

module.exports = function (Pictures,pictureId,req,cb) {
  Pictures.findOne({where:{and:[{pictureId:pictureId},{userId:req.accessToken.userId}]},include:['editpictures']}).then(function(pic,err) {
    if(err && !pic){
      console.log(err);
      return cb(error1);
    }
    pic=pic.toJSON();
    let picJson=Object.assign({},pic);
    removeProp('editpictures',picJson);
    let picArray=[picJson,...pic.editpictures];
    each(picArray,function(pic,next) {
      removeProp('url',pic)
      fetchUrlFromRds(pic,function(url) {
        pic.url=url
        next()
      })
    },function(err) {
      if(err) return console.log(err);
      cb(null,picArray)
    })
  })
};

function fetchUrlFromRds(pic,next) {
  let picType=pic.picType?pic.picType:'original';
  app.models.Picurls.get(picType+pic.tempName+'_url',function(err,value) {
    if(err) return console.log(err)
    params.Key=picType+'/'+picType+'_'+pic.tempName
    next(s3.getSignedUrl('getObject', params))
  })
}

