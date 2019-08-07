var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
first_name: String,
last_name: String,
email: String,
password: String,
// token: String,
// salt: String,
});
module.exports = mongoose.model('users', userSchema);
