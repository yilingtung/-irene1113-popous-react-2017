var Person = require('../models/person');
var Post = require('../models/post');
module.exports = function(req, res, next) {
    Post.find({}).populate('userid').exec(function(err, posts){
      if (err) throw err;
      posts.sort(function(a,b){
        return (b.updateTime - a.updateTime );
      });
      res.json(posts);
	  });
};
