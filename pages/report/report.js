// pages/report/report.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectList: [false, false, false, false, false, false],
    reasonList:["淫秽色情","违法信息","营销广告","攻击谩骂","侵权","其他"],
    textareaCSS: "none",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取手机高度
    that.setData({
      navT: app.globalData.navTop,
      navLH: app.globalData.navLineHeight,
      navH: app.globalData.navHeight
    });
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

  },

  selectItem:function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    var title = that.data.reasonList[index];
    var selectList = that.data.selectList;
    for (var i = 0; i < selectList.length; i++){
      selectList[i] = false;
    }
    selectList[index] = true;
    that.setData({
      selectList: selectList,
    });
    if (index == selectList.length - 1 && selectList[index]){
      that.setData({
        textareaCSS:"block",
      })
    } else {
      that.setData({
        textareaCSS: "none",
        context:'',
      })
    }
  },

  getContext:function(e){
    var that = this;
    that.setData({
      context: e.detail.value,
    });
  },

  reportEvent:function(){
    var that = this;
    var reason = '';
    for (var i = 0; i < that.data.selectList.length; i++){
      if (that.data.selectList[i] && i != that.data.selectList.length - 1){
        reason = that.data.reasonList[i];
      } else if (that.data.selectList[i] && i == that.data.selectList.length - 1){
        reason = that.data.context;
      }
    }
    if(reason == undefined || reason == ''){
      wx.showToast({
        title: '请选择或填写举报类型！',
        icon:"none",
      })
    }
    wx.request({
      url: '',
      method:"POST",
      header:{
        "Content-Type": "application/x-www-form-urlencoded",
        "token": wx.getStorageSync('token')
      },
      data:{
        reason:reason,
        validFlag:true,
      },
      success:function(res){
        if(res.data.code == 0){
          wx.showToast({
            title: '提交成功，感谢您的反馈和意见，我们会尽快处理！',
          })
        } else {
          wx.showToast({
            title: res.errmsg,
            icon:"none",
          })
        }
      }
    });
  },

  navBack: function () {
    wx.navigateBack({
    })
  },
})