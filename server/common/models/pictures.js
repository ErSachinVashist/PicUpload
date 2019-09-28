'use strict';
let ListenToSocket=require('../../socket/initSocket');
let AddPicture=require('../../server/custom_modules/pictures/addPicture')

module.exports = function(Pictures) {
  ListenToSocket(Pictures,'Pictures');

  Pictures.addPicture = function (req,res,data, cb) {
    AddPicture(Pictures, req,res,data, cb)
  };

  Pictures.remoteMethod(
    'addPicture',
    {
      description: 'addPicture',
      http: {path: '/addPicture', verb: 'post'},
      accepts: [{arg: 'req', type: 'object', 'http': {source: 'req'}},
        {arg: 'res', type: 'object', 'http': {source: 'res'}},
        {arg: 'data', type: 'object', required: true, http: {source: 'body'}}],
      returns: {root: true, type: 'object'}
    }
  );

};
