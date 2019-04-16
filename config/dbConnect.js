module.exports = function (host) {

   const mongoose = require('mongoose');
   
   mongoose.connect(host, {useNewUrlParser: true, autoIndex: false});

   const db = mongoose.connection;
   db.on('error', console.error.bind(console, 'connection error:'));
   db.once('open', function() {
    //  console.log(`${name} connect successful!`);
   });

};