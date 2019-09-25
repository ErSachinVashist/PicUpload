
module.exports = function (Users,data, cb) {
  Users.create(data).then(function(user){
    console.log("User Created : ",user.email)
    cb(null,user)
  }).catch(function(err) {
    cb({error:err.message})
  })
};
