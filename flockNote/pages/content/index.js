// flockNote/pages/content/index.js
const regeneratorRuntime = global.regeneratorRuntime;
const db = wx.cloud.database().collection('flockNotes');

const timeFormat = function (sec) { //毫秒单位
  let t = new Date(sec);

  let y = t.getFullYear();

  let m = t.getMonth() + 1;
  m = m < 10 ? '0' + m : m;

  let d = t.getDate();
  d = d < 10 ? '0' + d : d;

  let h = t.getHours();
  h = h < 10 ? '0' + h : h;

  let mi = t.getMinutes();
  mi = mi < 10 ? '0' + mi : mi;

  let s = t.getSeconds();
  s = s < 10 ? '0' + s : s;

  return `${y}-${m}-${d} ${h}:${mi}:${s}`;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTextarea: 0,
    currentIndex: -1,
    currentContent: '',
    userInfo: {},
    list: [
      { author: 'xx1', authorHead: '', authOpenid: '', content: '搞事情', time: '', timestr: ''}
    ], //日记列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.setData({userInfo: global.userInfo});
    
    const {data: list = []} = await db.where({ gid: this.data.userInfo.gid}).get();
    list.forEach(o => o.timestr = timeFormat(o.time));
    this.setData({
      list
    });

    console.log(list);
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

  async del(e){
    const {index} = e.currentTarget.dataset;
    const id = this.data.list[index]._id;

    const r = await db.doc(id).remove();

    const list = [...this.data.list];
    list.splice(index, 1);

    this.setData({list});
  },

  edit(e){
    const { index } = e.currentTarget.dataset;
    const current = this.data.list[index];
    const id = current._id;

    this.setData({
      showTextarea: 1,
      currentIndex: index,
      currentContent: current.content
    });
  },

  clear(){
    this.setData({currentContent: ''});
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