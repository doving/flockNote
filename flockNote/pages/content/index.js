// flockNote/pages/content/index.js
const regeneratorRuntime = global.regeneratorRuntime;
const db = wx.cloud.database().collection('flockNotes');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showInput: 0,
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

    this.setData({
      list
    });

    console.log(list);
  },

  showAdd(){
    this.setData({ showInput: true, currentIndex: -1 });
  },

  //编辑内容后确定，添加 or 修改 通用
  async confirm(e){
    const {value: content} = e.detail;
    const {currentIndex} = this.data;
    let list = [...this.data.list];
    //修改
    if(currentIndex > -1){
      const id = this.data.list[currentIndex]._id;

      await db.doc(id).update({data: {content}});

      list[currentIndex].content = content;
    //添加
    }else{
      const { nickName: author, head: authorHead, openid: authorOpenid, gid } = this.data.userInfo;
      const data = {author, authorHead, authorOpenid, gid, content, time: Date.now()}

      await db.add({data});

      list.push(data);
    }

    this.setData({ list, showInput: false });
  },

  async del(e){
    wx.showModal({
      title: '提示',
      content: '确定删除吗？',
      success: async res => {
        if(res.cancel)return; //取消删除，什么也不做

        const { index } = e.currentTarget.dataset;
        const id = this.data.list[index]._id;

        const r = await db.doc(id).remove();

        const list = [...this.data.list];
        list.splice(index, 1);

        this.setData({ list });

        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 1500
        })
      }
    });
    
  },

  showEdit(e){
    const { index: currentIndex } = e.currentTarget.dataset;
    this.setData({
      showInput: true, currentIndex
    });
  },

  inputBlur(){
    this.setData({showInput: false});
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