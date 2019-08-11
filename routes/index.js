var express = require('express');
var router = express.Router();
var userModel = require('../models/users');
var uid2 = require("uid2");
var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Whol Up Backend' });
});

// Mise en place de la route GET pour le Sign In.
router.get('/SignIn', function(req, res, next) {
  
// Verification de l'Existence d'un User via son email + son password.
// Création variable isUserExist.
  var isUserExist

// Requête permettant de vérifier via un email et mot de passe l’existance d’un utilisateur.
  userModel.findOne( 
    { email: req.query.email,
      // password: req.query.password
      }, 
// Stockage la réponse retournée par la requête dans un argument nommé users.
    function (err, users) {
        console.log("USERS ===>",users);
// Grâce à users vérification du nombre de users trouvés.
        if(!users){
          isUserExist=false
          // Attention à l'asynchrone pour la reponse JSON.
         res.json({ result:isUserExist});

        }else{
          var hash = SHA256(req.query.password + users.salt).toString(encBase64);
          console.log('USER.SALT ===>', users.salt)
          console.log('PASSWORD ===>',req.query.password)
          console.log('HASH ===>',hash)
          if (hash === users.password) {
          isUserExist=true
          // Attention à l'asynchrone pour la reponse JSON.
          res.json({ result:isUserExist, users});
          }else{
          isUserExist=false
          // Attention à l'asynchrone pour la reponse JSON.
          res.json({ result:isUserExist});

          }
        }
// // Attention à l'asynchrone pour la reponse JSON.
//         res.json({ result:isUserExist, users});
    }
)
});

// Mise en place de la route Post pour le Sign Up.
router.post('/SignUp', function(req, res, next) {

  var salt = uid2(32);

// Enregistrement d'un User via le Sign Up en gardant les meme proprietes que dans le schema.
  var newUser = new userModel ({
  first_name: req.body.first_name,
  last_name: req.body.last_name,
  email: req.body.email,
  password: SHA256(req.body.password + salt).toString(encBase64),
  token: uid2(32),
  salt: salt,
   });

   newUser.save(
    function (error, user) {
// Attention à l'asynchrone pour la reponse JSON.
    res.json({result:true,user});
    }
);
});

module.exports = router;
