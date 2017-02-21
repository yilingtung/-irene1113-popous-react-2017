var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var replySchema = new Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person'
  },
  replyContent: String,
  // imgContentData: Buffer,
  // imgContentType: String,
  updateTime: String,
  like:[]

},{ collection: 'reply' });

module.exports = mongoose.model('Reply', replySchema);
