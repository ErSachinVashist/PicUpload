'use strict';
let forEach=require('foreach');
let tokenByPicId=require('./tokenByPicId');
let removeProp = require('js-remove-property');
const AWS = require('aws-sdk');
const config = require('../config');
AWS.config.update(config.awsConfig);
let s3 = new AWS.S3({apiVersion: '2006-03-01'});
const params={
  Bucket: 'tp-pics-bucket',
  Expires: 60 * 5
}

module.exports = {
    publish: function (socket, options) {
        if (options) {
            let {collectionName,method,data} = options;
            let name = '';
            let findTokens;
            switch(collectionName){
                        case 'Pictures':
                            name='/' + collectionName + '/' + method;
                            if(data.uploadStatus==='done'){
                              params.Key='original/original_'+data.tempName;
                              options.data.url=s3.getSignedUrl('getObject', params)
                            }
                            else if(data.uploadStatus==='error'){
                              options.data.url='https://www.wpeka.com/rgh/wp-content/uploads/2017/04/2017-04-20.jpg'
                            }
                            findTokens=tokenByPicId(collectionName,data.pictureId);
                            break;
                        // case 'Auditlogs':
                        //     name='/' + collectionName + '/' + method;
                        //     findTokens=tokenByCompanyId(collectionName,data.companyId,data.userId);
                        //     break;
            }
            findTokens.then(function (tokens) {
                if(method==='DELETE'){
                    socket.emit(name, options);
                }
                else{
                  tokens=tokens.filter((tok,index)=>tokens.indexOf(tok)===index )
                    forEach(tokens,function (tok) {
                        socket.emit(name+'/'+tok.id, options);
                    })
                }
            })
        }
        else {
            throw 'Error: Option must be an object type';
        }
    }
};

