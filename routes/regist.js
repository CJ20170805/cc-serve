const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
let crypto;
try{
  crypto = require('crypto');
} catch {
  console.log('Do not support crypto!');
}

// const database = require('../config/database');
mongoose.connect("mongodb://localhost:27017/users", {useNewUrlParser: true, autoIndex: false});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connect successful!');
});
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


// define encrypt methods
function encrypt (str) {
  let hash = crypto.createHash('sha256');
  return hash.update(str).digest('hex');
};


router.post('/',(req,res)=>{
  // res.end('regissss');
  // console.log(req);
  let username = req.query.un;
  let password = encrypt(req.query.pw);
  
  if(username && password){

    // query had the same user?
    let encryptWord = encrypt(password);

    return Info.find({'un':username},{_id:0, __v:0},(err, data) => {
      if(err) return console.error(err);
        //  res.send(data.length);
        // console.log(data.length);
        if(data.length !== 0){
          res.json({
            code: '300',
            msg: '用户已存在'
          })
        }else{
          // new model 
          let infoData = new Info({
            un: username,
            pw: encryptWord
          });

          infoData.save(err => {
            if(err) return;
            res.json({
              errCode: '200',
              msg: 'regist SUC!'
            })
          });
        }
        // res.end();
      });
  
    

    
    
  } else {
    res.json({
      errCode: '500',
      msg: 'Data had empty!'
    })
  }

  
  // res.json(req.query);
  res.end();
  
});

module.exports = router;