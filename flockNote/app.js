//app.js
import regeneratorRuntime from './lib/regenerator-runtime/runtime.js';
global.regeneratorRuntime = regeneratorRuntime;
global.shareImg = '/images/share.png';

App({
  onLaunch: async function (o) {
    global.launchData = o;
    //console.log(o, 'ooooooooooooooooooooooo');
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      });
      
      wx.showShareMenu({
        withShareTicket: true
      });
    }

  },

  onShow(o){
    //console.log(o, 'ooooooooooooooooooooooo');
    global.launchData = o;
  }
})
