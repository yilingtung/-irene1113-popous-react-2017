var Post = require('../models/post');

module.exports = function(req, res, next) {
    Post.findOne({_id : req.query._id},function(err,post) {
      if (err) throw err;
      res.json(post);
    });
};
