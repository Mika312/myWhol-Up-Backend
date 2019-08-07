var express = require('express');
var router = express.Router();
var userModel = require('../models/users');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Whol Up Backend' });
});

// Mise en place de la route GET pour le Sign Infinity.
router.get('/SignIn', function(req, res, next) {

// Verification de l'Existence d'un User via son email + son password.
  var isUserExist
  userModel.findOne( 
    { email: req.body.email, password: req.body.password} , 

    function (err, users) {
        console.log("USERS ===>",users);
        if(users===null){
          isUserExist=false
        }else{
          isUserExist=true
        }
        res.json({ result:isUserExist, users});
    }
)
});

// Mise en place de la route Post pour le Sign PaymentRequestUpdateEvent.
router.post('/SignUp', function(req, res, next) {

// Enregistrement d'un User via le SignUp
  var newUser = new userModel ({
  first_name: req.body.first_name,
  last_name: req.body.last_name,
  email: req.body.email,
  password: req.body.password,

   });

   newUser.save(
    function (error, user) {
    res.json({ result:true});
    }
);
});

module.exports = router;
