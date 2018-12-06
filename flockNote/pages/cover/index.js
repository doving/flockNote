// pages/dairy/index.js
const regeneratorRuntime = global.regeneratorRuntime;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    needShare: false, //是否需要分享，便于在群中打开
    needLogin: false,
    userInfo: {
      nickName: '',
      head: '',
      openid: '',
      gid: ''
    }
  },
  onShareAppMessage: function (o) {
    return {
      title: '快来看看我们群的大事记',
      path: '/pages/cover/index',
      imageUrl: global.shareImg
    }
  },

  login: async data => new Promise(res => {
    wx.cloud.callFunction({
      name: 'login',
      data,
      complete(r) {
        res(r.result);
      }
    });

    wx.showShareMenu({
      withShareTicket: true
    });
  }),

  getLoginData: async () => new Promise(res => {
    wx.login({
      success(r) {
        const { code } = r;
        const { shareTicket: ticket } = global.launchData;

        if (ticket) {
          wx.getShareInfo({
            shareTicket: ticket,
            success(r) {
              const { encryptedData, iv } = r;
              res({ code, encryptedData, iv });
            }
          })
        } else {
          res({ code });
        }
      }
    })
  }),

  getUserInfo: async () => new Promise(res => {
    wx.getSetting({
      success(r) {
        res.authSetting = 'scope.userInfo';
        wx.getUserInfo({
          success(r) {
            res(r.userInfo);
          },

          fail(e) {
            res();
          }
        })
      }
    })
  }),
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const userInfo = await this.getUserInfo();
    const {nickName, avatarUrl: head} = userInfo || {};

    this.setData(userInfo ? {userInfo: {
      nickName, head
    }} : {needLogin: true});

    const loginData = await this.getLoginData();
    console.log('loginData', loginData);

    const info = await this.login(loginData);
    console.log('info', info);

    //const {gid, openid} = info;
    this.setData({
      needShare: !info.gid,
      userInfo: {
        ...this.data.userInfo,
        ...info
      }
    });
    
    console.log(this.data.userInfo);

    const {gid, openid} = this.data.userInfo;

    if (nickName && gid){
      global.userInfo = this.data.userInfo;
      wx.redirectTo({
        url: '/pages/content/index',
      })
    }
  },

  onGetUserinfo(res) {
    const { nickName, avatarUrl: head } = res.detail.userInfo;
    this.setData({
      needLogin: false,
      userInfo: { 
        ...this.data.userInfo, 
        ...{nickName, head}
      }
    });

    console.log('this.data.userInfo', this.data.userInfo);
  },

  //监听页面分享事件
  // onShareAppMessage(o){
  //   console.log(o, '========================');
  //   return {
  //     title: '我们的群原来发生过这么多大事呀',
  //     path: '/page/index',
  //     imageUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLXgbtyIzFqoLI8K3q3iaHSGkTq4Z8HU2a7YzgfliaQ6P3icZ4lkziayB7d9ENkHENFic8EuHE0IiaJ9mhw/132'
  //   }
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  // /**
  //  * 用户点击右上角分享
  //  */
  // onShareAppMessage: function () {

  // }
})