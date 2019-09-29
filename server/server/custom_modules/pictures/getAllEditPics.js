const AWS = require('aws-sdk');
let forEach=require('foreach');
let removeProp = require('js-remove-property');
let s3 = new AWS.S3({apiVersion: '2006-03-01'});
const params={
  Bucket: 'tp-pics-bucket',
  Expires: 60 * 5
}
let error1 = new Error('No Picture Found with this Id');

module.exports = function (Pictures,pictureId,req,cb) {
  console.log()
  Pictures.findOne({where:{and:[{pictureId:pictureId},{userId:req.accessToken.userId}]},include:['editpictures']}).then(function(pic,err) {
    if(err && !pic){
      console.log(err);
      return cb(error1);
    }
    pic=pic.toJSON();
    let picJson=Object.assign({},pic);
    params.Key='original/original_'+pic.tempName;
    picJson.url=s3.getSignedUrl('getObject', params)
    removeProp('editpictures',picJson)
    let editPicsArray=[picJson];

    forEach(pic.editpictures,function(editPic) {
      params.Key=editPic.picType+'/'+editPic.picType+'_'+pic.tempName
      editPic.url=s3.getSignedUrl('getObject', params)
      editPicsArray.push(editPic)
    })
    cb(null,editPicsArray)
  })
};

