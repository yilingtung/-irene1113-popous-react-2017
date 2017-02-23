var Person = require('../models/person');
var Post = require('../models/post');
var Reply = require('../models/reply');

module.exports = function ( req, res, next ){
  Post.findOneAndRemove({_id: req.query._id}).exec(function ( err, post ){
    if(err) throw err;
    post.reply.map(function(obj) {
      Reply.findOneAndRemove({_id: obj}, function ( err, post ){
        if(err) throw err;
        res.json({delete_status: 1 ,delete_message: "remove."});
      });
    });

  });
};
