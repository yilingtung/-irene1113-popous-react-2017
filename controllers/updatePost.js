var Person = require('../models/person');
var Post = require('../models/post');

module.exports = function(req, res, next) {
  if(req.query.type =='editPost'){
    Post.findOneAndUpdate({ _id: req.body._id }, req.body, function(err) {
      if (err) throw err;
      res.end();
    });
  }
  else if(req.query.type =='like'){
    Post.findOne({_id: req.query._id}, function(err, post) {
      if (err) throw err;
      var likeList = post.like;
      var iLike = post.like.includes(req.session._id);
      if(iLike){
        var index = likeList.indexOf(req.session._id);
        likeList.splice(index,1);
      }else{
        likeList.push(req.session._id);
      }
      Post.findOneAndUpdate({_id: req.query._id}, {like: likeList}, function(err) {
        if (err) throw err;
        res.end();
      });
    });
  }
  else if(req.query.type =='reply'){
    Post.findOne({_id: req.query._id}, function(err, post) {
      if (err) throw err;
      var replyList = post.reply;
      var exist = post.reply.includes(req.query.replyId);
      if(exist){
        //已經存在所以要刪除
        var index = replyList.indexOf(req.query.replyId);
        replyList.splice(index,1);
      }else{
        //還不存在所以要push在最後一個
        replyList.push(req.query.replyId);
      }
      Post.findOneAndUpdate({_id: req.query._id}, {reply: replyList}, function(err) {
        if (err) throw err;
        res.end();
      });
    });
  }
};
