const fs = require('fs');
let error1 = new Error('Error in uploading image file');

module.exports = function(Pictures, req, res, data, cb) {
  if (data.blob === null) {
    return cb(error1);
  }
  let picObj = {
    userId: req.accessToken.userId,
    fileName: `${new Date().getTime()}_pic.png`,
    tempName:`org_${new Date().getTime()}.png`
  };
  Pictures.create(picObj,function(err,pic) {
    if (err) {
      console.log(err);
      return cb(error1);
    }
    uploadPic(pic,data.blob,cb)
  })
};

function uploadPic(pic,blob,cb) {
    let base64Data = blob.replace(/^data:image\/png;base64,/, '');
    fs.writeFile(__dirname + `/originals-pics/${pic.tempName}`, base64Data, 'base64', function(err) {
      if (err) {
        console.log(err);
        return cb(error1);
      }
      cb(null, pic);
    });
}
