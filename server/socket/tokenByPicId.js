let app=require('../../server');
let forEach=require('foreach');
const addSubtractDate = require("add-subtract-date");
let removeProp = require('js-remove-property');

function tokenValid(tok) {
    let ttlDate=new Date(tok.created)
    let expiryDate=addSubtractDate.add(ttlDate,tok.ttl,'seconds')
    return expiryDate>new Date()
}

module.exports=function(collectionName,picId) {
    const AccessToken=app.models.AccessToken;
    const Pictures=app.models.Pictures;
  return new Promise(function(resolve, reject) {
    Pictures.findById(picId,{include:[{relation:'users',scope:{include:['accessTokens']}}]}).then(function(pics,err) {
      if(err) return console.log(err)
      pics=pics.toJSON()
      let tokens=[];
      forEach(pics.users.accessTokens,function (tok) {
        if(tokenValid(tok)){
          tokens.push(tok);
        }
      })
      resolve(tokens)
    })
  })
};
