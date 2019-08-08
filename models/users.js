
var mongoose = require('mongoose');

// Définition d'une variable userSchema qui contient le schéma des données relatives à l’utilisateur.
var userSchema = mongoose.Schema({
first_name: String,
last_name: String,
email: String,
password: String,
// token: String,
// salt: String,
});

// Export du module et des variables.
module.exports = mongoose.model('users', userSchema);
