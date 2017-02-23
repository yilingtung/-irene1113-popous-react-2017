var request = require('superagent');
var Post = require('../models/post');

module.exports = function(req, res, next){
  var post = new Post(req.body);
  post.userid = req.session._id;
  post.imgURL = req.body.imgURL;
  post.save(function(err){
  	if (err) throw err;
  	console.log('post saved!');
    res.json({m: 1});
  });
};
