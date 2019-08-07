const mongoose = require('mongoose');

var options = {
connectTimeoutMS: 5000,
useNewUrlParser: true
}

var username = 'Mika312'
var password = 'azerty'
var myCluster= 'mikalacapsule'
var myProject= 'myWholUPApp'


mongoose.connect('mongodb+srv://'+username+':'+password+'@'+myCluster+'-ibsxa.mongodb.net/'+myProject+'?retryWrites=true',
options,
function(err) {
if (!err){
console.log("R.A.S");
}
}
);

module.exports=mongoose;
