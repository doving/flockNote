// flockNote/pages/content/index.js
const regeneratorRuntime = global.regeneratorRuntime;
const db = wx.cloud.database().collection('flockNotes');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    list: [
      {author: 'xx1', authorHead: '', authOpenid: '', time: '', content: '搞事情'}
    ], //日记列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.setData({userInfo: global.userInfo});
    
    const {data: list = []} = await db.where({ gid: this.data.userInfo.gid}).get();
    console.log(list, ' === list');
    this.setData({
      list
    });
  },

  async add(){
    const {nickName: author, head: authorHead, openid: authorOpenid, gid} = this.data.userInfo
    const r = await db.add({
      data: {
        author,
        authorHead,
        authorOpenid,
        gid,
        content: 'this is contet',
        time: Date.now()
      }
    });

    console.log(r, ' add');
  },

  del(i){

  },

  edit(i){

  },

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})