// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”
const secret = '0ed9a4e6fd35bf17ca16afb2681fd635';
const request = require('request');
const decrypt = require('./decrypt');
/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含小程序端调用传入的 data
 * 
 */
const getSession = async (appId, code) => new Promise(res => {
  console.log(`getSession|start|appId|${appId}|code|${code}`);
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${secret}&js_code=${code}&grant_type=authorization_code`;
  request({url, json:true}, (err, rs, body) => {
    if(err){
      console.log(`getSession|err`, e);
      res({});
    }else{
      console.log(`getSession|response`, body);
      res(body.session_key);
    }
  });
})

exports.main = async (event, context) => {
  const { code, encryptedData, iv, userInfo } = event;

  const sessionKey = await getSession(userInfo.appId, code);
  console.log('sessionKey|', sessionKey);
  global.session = sessionKey;

  //console.log(global);

  if (!encryptedData || !iv) return { openid: userInfo.openId}

  const res = decrypt({ sessionKey, encryptedData, iv});
  
  return { openid: userInfo.openId, gid: res.openGId};
}
