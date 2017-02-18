var Post = require('../models/post');

module.exports = function(req, res, next) {
  Post.findOne({_id: req.query._id}, function(err, post) {
    if (err) throw err;
    var likeList = post.like;
    if(req.query.iLike == true){
      var index = likeList.indexOf(req.query._id);
      likeList.splice(index,1);
    }else{
      likeList.push(req.query._id);
    }
    Post.findOneAndUpdate({_id: req.query._id}, {like: likeList}, function(err, post) {
      if (err) throw err;
      console.log(req.query.iLike);
      var likeLen = likeList.length;
      res.json({iLike: !req.query.iLike, likeLen: likeLen});
    });
  });
};
