
let error1 = new Error("User Not Found")
let error2 = new Error("User Not Active")
let error3 = new Error("User Not Authorized")
let error4 = new Error("Backend Error")

module.exports = function(Users,req,res,cred,cb) {
  Users.findOne({where:{email:cred.email.toLowerCase()},include:[{relation:'roles',scope:{fields:['name']}}]}).then(function(user){
      if(user) {
        user=user.toJSON()
          if(user.status==='active') {
            Users.login({
              email: cred.email,
              password: cred.password,
              ttl: 1209600
            }, function (err, token) {
              if (err) {
                cb(error3)
              }
              else {
                token=Object.assign(token,user)
                cb(null, token)
              }
            })
          }
          else{
            cb(error2)
          }
    }
    else{
      cb(error1)
    }
  })
    .catch(function(err) {
      error4.error=err.message;
      cb(error4)
    })
};

