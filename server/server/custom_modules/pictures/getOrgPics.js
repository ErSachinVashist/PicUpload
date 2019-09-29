let forEach=require('foreach');
const AWS = require('aws-sdk');
let s3 = new AWS.S3({apiVersion: '2006-03-01'});
const params={
  Bucket: 'tp-pics-bucket',
  Expires: 60 * 5
}

module.exports = function (Pictures,req,cb) {
  Pictures.find({where:{userId:req.accessToken.userId},order:'pictureId DESC'}).then(function(pics) {
    forEach(pics,function(pic) {
      params.Key='original/original_'+pic.tempName;
      pic.url=(
        function() {
          switch (pic.uploadStatus) {
            case 'done': return s3.getSignedUrl('getObject', params)
            case 'error':return 'https://www.wpeka.com/rgh/wp-content/uploads/2017/04/2017-04-20.jpg'
            default: return 'https://i.gifer.com/IH6W.gif'
          }
        }
      )()
    });
    cb(null,pics)
  }).catch(function(err) {
    console.log(err)
    cb({error:err.message})
  })
};

