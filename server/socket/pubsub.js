'use strict';
let forEach=require('foreach');
let tokenByPicId=require('./tokenByPicId');
let removeProp = require('js-remove-property');
module.exports = {
    publish: function (socket, options) {
        if (options) {
            let {collectionName,method,data,modelId} = options;
            let name = '';
            let findTokens;
            switch(collectionName){
                        case 'Pictures':
                            name='/' + collectionName + '/' + method;
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

