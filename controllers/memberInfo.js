var Person = require('../models/person');
var Post = require('../models/post');
module.exports = function(req, res, next) {
  console.log('test');
  if(req.session._id != null){
    console.log('test1');
    Person.findOne({_id : req.session._id}).lean().exec(function(err,user) {
      if (err) throw err;
      user.login = true;
      console.log(user.login);
      res.json(user);
    });
  }else{
    var user = {
      login: false,
      _id: 0,
      idname: "訪客",
      imgURL: "assets/img/login_member.png"
    };
    res.json(user);
  }
};
