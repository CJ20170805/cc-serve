const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const encrypt = require('../utils/encrypt');

const connect = require('../config/dbConnect');
const dbName = require('../config/dbHost');


connect(dbName.users);

// define schema
const Schema = mongoose.Schema;

let InfoSchema = new Schema({
  un: String,
  pw: String,
  date: {type: Date, default: Date.now}
});

InfoSchema.index({un: 1});

// define model 
let Info = mongoose.model('Info', InfoSchema);

router.post('/',(req,res)=>{

  let username = req.body.un;
  let password = encrypt(req.body.pw);
  
  if(username && password){

    return Info.find({'un':username},{_id:0, __v:0},(err, data) => {
      if(err) return console.error(err);

        if(data.length !== 0){
          res.json({
            code: '300',
            msg: '用户已存在'
          })
        }else{

          // new model 
          let infoData = new Info({
            un: username,
            pw: password
          });

          infoData.save(err => {
            if(err) return;
            res.json({
              errCode: '200',
              msg: 'regist SUC!'
            })
          });
        }

      });
  
  } else {
    res.json({
      errCode: '500',
      msg: 'Data had empty!'
    })
  }
  
});

module.exports = router;