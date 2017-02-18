var Person = require('../models/person');
var Post = require('../models/post');
module.exports = function(req, res, next) {
    Post.find({}).populate('userid').lean().exec(function(err, posts){
      if (err) throw err;
      posts.sort(function(a,b){
        return (b.updateTime - a.updateTime );
      });
      posts.map(function(obj) {
        if(obj.userid._id == req.session._id){
          obj['isMyPost'] = true;
        }else{
          obj['isMyPost'] = false;
        }
        obj['likeLen'] = obj.like.length;
        obj['iLike'] = obj.like.includes(req.session._id);
        console.log(obj);
        return obj;
      });
      res.json(posts);
	  });
};
