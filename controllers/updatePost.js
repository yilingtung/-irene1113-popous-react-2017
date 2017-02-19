var Person = require('../models/person');
var Post = require('../models/post');

module.exports = function(req, res, next) {
  if(req.query.type =='editPost'){
    Post.findOneAndUpdate({ _id: req.body._id }, req.body, function(err) {
      if (err) throw err;
    });
  }else if(req.query.type =='like'){
    Post.findOne({_id: req.query._id}, function(err, post) {
      if (err) throw err;
      var likeList = post.like;
      var iLike = post.like.includes(req.session._id);
      console.log(iLike);
      if(iLike){
        var index = likeList.indexOf(req.session._id);
        likeList.splice(index,1);
      }else{
        likeList.push(req.session._id);
      }
      Post.findOneAndUpdate({_id: req.query._id}, {like: likeList}, function(err, post) {
        if (err) throw err;
      });
    });
  }
};
