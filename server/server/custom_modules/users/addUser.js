
module.exports = function (Users,data, cb) {
  if(data.email){
    data.email=data.email.toLocaleLowerCase()
  }
  Users.create(data).then(function(user){
    console.log("User Created : ",user.email)
    cb(null,user)
  }).catch(function(err) {
    cb({error:err.message})
  })
};
