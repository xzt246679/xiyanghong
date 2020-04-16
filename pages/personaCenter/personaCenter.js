// pages/personaCenter/personaCenter.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar:4,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      navT: app.globalData.navTop,
      navLH: app.globalData.navLineHeight,
      navH:app.globalData.navHeight,
      user:wx.getStorageSync('user')
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

  changeTabbar:function(e){
		var tabbar = e.currentTarget.dataset.tabbar;
		if(tabbar == 0){
			wx.redirectTo({
				url: '/pages/index/index',
			})
		} else if(tabbar == 1){
			wx.redirectTo({
				url: '/pages/party/party',
			})
		} else if(tabbar == 2){
			wx.redirectTo({
				url: '/pages/forum/forum',
			})
		} else if(tabbar == 3){
			wx.redirectTo({
				url: '/pages/lifeCircle/lifeCircle',
			})
		} else if(tabbar == 4){
			wx.redirectTo({
				url: '/pages/personaCenter/personaCenter',
			})
		}
	},
})