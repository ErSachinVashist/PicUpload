'use strict';
let ListenToSocket=require('../../socket/initSocket');
let AddPicture=require('../../server/custom_modules/pictures/addPicture')
let GetAllEditPics=require('../../server/custom_modules/pictures/getAllEditPics')
let GetOrgPics=require('../../server/custom_modules/pictures/getOrgPics')

module.exports = function(Pictures) {
  ListenToSocket(Pictures,'Pictures');

  Pictures.addPicture = function (req,res,data, cb) {
    AddPicture(Pictures, req,res,data, cb)
  };
  Pictures.getOrgPics = function (req, cb) {
    GetOrgPics(Pictures,req, cb)
  };
  Pictures.getAllEditPics = function (pictureId,req, cb) {
    GetAllEditPics(Pictures,pictureId,req, cb)
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
  Pictures.remoteMethod(
    'getOrgPics',
    {
      description: 'getOrgPics',
      http: {path: '/getOrgPics', verb: 'get'},
      accepts: [
        {arg: 'req', type: 'object', 'http': {source: 'req'}},
      ],
      returns: {root: true, type: 'object'}
    }
  );

  Pictures.remoteMethod(
    'getAllEditPics',
    {
      description: 'getAllEditPics',
      http: {path: '/:pictureId/getAllEditPics', verb: 'get'},
      accepts: [
        {arg: 'pictureId', type: 'number', required: true},
        {arg: 'req', type: 'object', 'http': {source: 'req'}},
      ],
      returns: {root: true, type: 'object'}
    }
  );

};
