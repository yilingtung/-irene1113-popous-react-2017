var request = require('superagent');
var Reply = require('../models/reply');

module.exports = function(req, res, next){
  var reply = new Reply(req.body);
  reply.userid = req.session._id;
  reply.save(function(err,reply){
  	if (err) throw err;
    console.log('**add a reply, _id: ' + reply._id);
    res.json(reply._id);
  });

};
