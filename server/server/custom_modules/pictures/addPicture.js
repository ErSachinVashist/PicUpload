const fs = require('fs');
const config=require('../../../config')
let PushToQueue = require('../../../workers/pushToQueue');
let error1 = new Error('Error in uploading image file');
module.exports = function(Pictures, req, res, data, cb) {
  if (data.blob === null) {
    return cb(error1);
  }

  let picObj = {
    userId: req.accessToken.userId,
    tempName:`${new Date().getTime()}.png`
  };
  Pictures.create(picObj,function(err,pic) {
    if (err) {
      console.log(err);
      return cb(error1);
    }
    // Pictures.upsertWithWhere({pictureId:pic.pictureId},{uploadStatus:'done'},cb)
    pic=pic.toJSON();
    let queueObj=Object.assign({},pic);
    queueObj.base64Data=data.blob.replace(/^data:image\/png;base64,/, '');
    PushToQueue(queueObj,config.w1queue,function(err) {
      if(err){
        Pictures.upsertWithWhere({pictureId:pic.pictureId},{uploadStatus:'error',raw:JSON.stringify(err)},function(err2) {
          if(err) return console.log(err2)
          cb(err)
        })
      }
      else{
        return cb(null,pic)
      }
    })
  })
};
