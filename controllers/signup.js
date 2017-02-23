var Person = require('../models/person');

module.exports = function(req, res, next) {
	//res.send('Thank you!');
  console.log(req.body);
  var b_checker = true;
  Person.findOne({idname:req.body.idname}, function(err, user) {
    if (user) {
      res.json({signup_status : 0 , signup_message : '名字已經被使用過了'});
      b_checker = false;
    }
    if(b_checker){
      Person.findOne({username:req.body.username}, function(err, user) {
        if (user) {
          res.json({signup_status : 0 , signup_message : '帳號已經被使用過了'});
          b_checker = false;
        }
        if(b_checker){
        	var person = new Person(req.body);
        	person.save(function(err){
        		if (err) throw err;
        		console.log('person saved!');
            req.session._id = person._id;
            req.session.idname = person.idname;
            res.json({signup_status: 1 , signup_message : ''});
          });
        }
      });
    }
  });
};
