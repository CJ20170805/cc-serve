var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

// mongoose connect
// mongoose.connect('mongodb://localhost:27017/admin', {useNewUrlParser: true});

// // connect infos
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log('connect successful!=users');
// });

// define schema
// let userSchema = mongoose.Schema({
//   username: String,
//   password: String,
//   recordDate: {type: Date,default: Date.now}
// });

// // Add a method to Schema
// userSchema.methods.speak = function () {
//   console.log('lalaalalala');
// };

// // define model     like a Class?
// let User = mongoose.model('User', userSchema);

// let user1 = new User({
//   username: 'GGGGGG',
//   password: '888888'
// });

// // save the data
// user1.save((err,user1)=>{
//   if(err) return;
//   console.log('Add success!!!');
//   user1.speak();
// });



// 1: define databaseName  Schema
// 2: define model
// 3: new Model add data
// 4： model .save()



// const Cat = mongoose.model('Cat', { name: String });


// const kitty = new Cat({ name: 'Zildjian' });

// kitty.save().then(() => console.log('meow'));



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(200).send('respond with a resource');
  // User.find((err,data)=>{
  //   if(err) return;
  //   res.json(data);
  // })
});

module.exports = router;
