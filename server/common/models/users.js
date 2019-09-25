'use strict';
let AddUser=require('../../server/custom_modules/users/addUser')
module.exports = function(Users) {
  Users.disableRemoteMethod("create", true);
    Users.addUser = function (data, cb) {
      AddUser(Users, data, cb)
    };

  Users.remoteMethod(
    'addUser',
    {
      description: 'addUser',
      http: {path: '/addUser', verb: 'post'},
      accepts: [{arg: 'data', type: 'object', required: true, http: {source: 'body'}}],
      returns: {root: true, type: 'object'}
    }
  );

};
