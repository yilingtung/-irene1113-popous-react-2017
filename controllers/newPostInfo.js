var Post = require('../models/post');
var Person = require('../models/person');

module.exports = function(req, res, next) {
    Post.findOne({userid : req.query.userid, updateTime : req.query.updateTime}).populate('userid').exec(function(err,post) {
      if (err) throw err;
      res.json(post);
    });
};
