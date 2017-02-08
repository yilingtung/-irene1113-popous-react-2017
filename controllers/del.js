var Person = require('../models/person');
var Post = require('../models/post');

module.exports = function ( req, res, next ){
  Post.findOneAndRemove({_id : req.query._id}, function ( err, post ){
    if(err) throw err;
    else res.json({delete_status: 1 ,delete_message: "remove."});
  });
};
