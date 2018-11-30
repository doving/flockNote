//微信通用解密函数
const crypto = require('crypto');
const cloud = require('wx-server-sdk');
cloud.init();

module.exports = function (o) {
  console.log(`decrypt|satart|`, o)
  let { sessionKey, encryptedData, iv } = o;
  const { APPID: appId } = cloud.getWXContext();
  // base64 decode
  sessionKey = new Buffer(sessionKey, 'base64')
  encryptedData = new Buffer(encryptedData, 'base64')
  iv = new Buffer(iv, 'base64')

  try {
    // 解密
    var decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
    // 设置自动 padding 为 true，删除填充补位
    decipher.setAutoPadding(true)
    var decoded = decipher.update(encryptedData, 'binary', 'utf8')
    decoded += decipher.final('utf8')

    decoded = JSON.parse(decoded)

  } catch (err) {
    throw new Error('Illegal Buffer')
  }

  if (decoded.watermark.appid !== appId) {
    throw new Error('Illegal Buffer')
  }
  console.log(`descrypt|response|`, decoded);
  return decoded
}