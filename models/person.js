var mongoose = require('mongoose');
mongoose.connect('mongodb://irene:123@ds053146.mlab.com:53146/popous0122');
var Schema = mongoose.Schema;
var personSchema = new Schema({
  idname : String,
  username : String,
  password  : String,
  imgURL: String

},{ collection: 'userinfo' });
personSchema.methods.validPassword = function( pwd ) {
    // EXAMPLE CODE!
    return ( this.password === pwd );
};
module.exports = mongoose.model('Person', personSchema);
