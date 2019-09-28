const fs = require('fs');
let PushToQueue = require('../../../workers/queueActions/pushToQueue');
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
    pic.base64Data = data.blob.replace(/^data:image\/png;base64,/, '')
    PushToQueue(pic,'tp-w1-queue',function() {
      return cb(null,pic)
    })
  })
};
