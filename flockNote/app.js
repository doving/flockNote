//app.js
import regeneratorRuntime from './lib/regenerator-runtime/runtime.js';
global.regeneratorRuntime = regeneratorRuntime;

App({
  onLaunch: async function (o) {
    global.launchData = o;
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
    
  }
})
