// pages/party/party.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar:1,
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

  /**
   * 跳转到家庭餐详情页
   */
  goPartyDetail:function(e){
    var partId = e.currentTarget.dataset.partId;
    wx.navigateTo({
      url: '/pages/partDetail/partDetail?partId=' + partId,
    })
  },

  /**
   * 跳转到发布家庭餐页面
   */
  goPublishPage:function(){
    wx.navigateTo({
      url: '/pages/publishParty/publishParty',
    });
  },

  /**
   * 切换tabbar的点击事件
   */
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