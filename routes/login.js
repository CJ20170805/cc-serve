const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const encrypt = require('../utils/encrypt');
const connect = require('../config/dbConnect');
const dbName = require('../config/dbHost');

router.post('/', (req, res) =>{
 
  let un = req.body.un;
  let pw = encrypt(req.body.pw);

  connect(dbName.users);
   
  let Info =  mongoose.model('Info');

  Info.find({'un': un,'pw': pw},(err, data) => {
      if(err) return console.err(err);

      if(data.length !== 0) {
        res.json({
          code: 200,
          msg: 'login Suc!'
        })
      } else {
        res.json({
          code: 500,
          msg: 'login Fail!'
        })
      }
    });
  
  // console.log('aaa',un,pw);
  // res.send(req.body);
});

module.exports = router;