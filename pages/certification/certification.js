// pages/certification/certification.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    srcs:["未选中状态的png路径","未选中状态的png路径"],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var thta = this;
    thta.setData({
      navT: app.globalData.navTop,
      navLH: app.globalData.navLineHeight,
      navH: app.globalData.navHeight
    })
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

  getName:function(e){
    var that = this;
    that.setData({
      name:e.detail.value,
    })
  },

  getPhone:function(e){
    var that = this;
    that.setData({
      phone:e.detail.value,
    })
  },

  getAge:function(e){
    var that = this;
    that.setData({
      age:e.detail.value,
    })
  },

  getAddress:function(e){
    var that = this;
    that.setData({
      address:e.detail.value,
    })
  },

  selectSex:function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    var srcs = that.data.srcs;
    for(var i = 0; i < srcs.length; i++){
      if(i == index){
        srcs[i] = "已选中状态的png路径"
      } else {
        srcs[i] = "未选中状态的png路径"
      }
    }
    that.setData({
      srcs:srcs,
    })
  },

  submit:function(){
    var that = this;
    wx.request({
      url: app.globalData.url + '',
      method:"POST",
      header:{
        "Content-Type": "application/x-www-form-urlencoded",
        "token": wx.getStorageSync('token'),
      },
      data:{
        validFlag:true,
      },
      success:function(res){
        if(res.data.code == 0){
          wx.showToast({
            title: '后台审核中...',
          })
        } else {
          wx.showToast({
            title: res.data.errmsg,
            icon:"none"
          })
        }
      }
    })
  },

  navBack: function () {
    wx.navigateBack({
    })
  },
})