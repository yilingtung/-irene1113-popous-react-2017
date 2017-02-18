var Person = require('../models/person');
var Post = require('../models/post');

module.exports = function(req, res, next) {
  Post.findOneAndUpdate({ _id: req.query._id }, { like: req.body }, function(err) {
    if (err) throw err;
  });
};
