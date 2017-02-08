var Person = require('../models/person');

module.exports = function(req, res, next) {
  if(req.session.idname == req.body.idname){
    Person.findOneAndUpdate({ _id: req.session._id }, req.body, function(err, user) {
      if (err) throw err;
      console.log('update successifully!');
      req.session.idname = req.body.idname;
      res.json({update_status: 1 , update_message: ''});
    });
  }
  else{
    Person.findOne({idname:req.body.idname}, function(err, user) {
      if (user && req.body.idname != req.session.idname) {
        console.log('The idname that you chose has already been taken.');
        res.json({update_status : 0 , update_message : '已經被使用過了'});
      }
      else {
        Person.findOneAndUpdate({ _id: req.session._id }, req.body, function(err, user) {
      		if (err) throw err;
      		console.log('update successifully!');
          req.session.idname = req.body.idname;
          res.json({update_status: 1 , update_message: ''});
      	});
      }
    });
  }
};
