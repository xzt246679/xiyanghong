// pages/partDetail/partDetail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      navT: app.globalData.navTop,
      navLH: app.globalData.navLineHeight,
      navH: app.globalData.navHeight,
      partId:options.id,
    })
    that.getPartDetail();
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

  navBack: function () {
    wx.navigateBack({
    })
  },

  /**
   * 根据id获取家庭餐详情
   */
  getPartDetail:function(){
    var that = this;
    console.log(app.globalData.url);
    wx.request({
      url: app.globalData.url + '/system/meals/getByContent',
      method:"POST",
      header:{'Content-Type': "application/x-www-form-urlencoded","token": wx.getStorageSync('token')},
      data:{
        id:that.data.partId,
      },
      success:function(res){
        if(res.data.code == 0){
          console.log(res.data.data);
        } else {
          wx.showToast({
            title: res.data.errmsg + '',
            icon:"none",
          })
        }
      }
    })
  },
  
})