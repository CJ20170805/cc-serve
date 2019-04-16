module.exports = function (str) {
  let crypto;
  try{
    crypto = require('crypto');
  } catch {
    console.log('Do not support crypto!');
  };
  let hash = crypto.createHash('sha256');
  return hash.update(str).digest('hex');
}