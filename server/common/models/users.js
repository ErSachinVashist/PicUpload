'use strict';
let AddUser=require('../../server/custom_modules/users/addUser')
let UserLogin=require('../../server/custom_modules/users/login')


module.exports = function(Users) {

  Users.disableRemoteMethodByName("create");
  Users.disableRemoteMethodByName("login");

  Users.userLogin = function (req, res, cred, cb) {
    UserLogin(Users, req, res, cred, cb)
  };

  Users.addUser = function (data, cb) {
      AddUser(Users, data, cb)
    };

  Users.remoteMethod(
    'userLogin',
    {
      description: 'login',
      http: {path: '/userLogin', verb: 'post'},
      accepts: [{arg: 'req', type: 'object', 'http': {source: 'req'}},
        {arg: 'res', type: 'object', 'http': {source: 'res'}},
        {arg: 'data', type: 'object', required: true, http: {source: 'body'}}],
      returns: {root: true, type: 'object'}
    }
  );

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
