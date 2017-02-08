var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var postSchema = new Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person'
  },
  postcontent: String,
  // imgContentData: Buffer,
  // imgContentType: String,
  imgURL: String,
  updateTime: String

},{ collection: 'userpost' });

module.exports = mongoose.model('Post', postSchema);
