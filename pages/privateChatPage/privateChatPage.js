// pages/privateChatPage/privateChatPage.js
import SDK from "../../sdk/connection.js";
var WebIM = require('../../utils/WebIM.js');
var WebIM = WebIM.default;

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
    that.hxloign();
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

  hxloign: function () {
    var options = {
        apiUrl: WebIM.config.apiURL,
        user: 'u1',
        pwd: 'p1',
        grant_type: 'password',
        appKey: WebIM.config.appkey //应用key
    }
    WebIM.conn.open(options);
  },

  sendMessage: function () {
    var that = this;
    var id = WebIM.conn.getUniqueId();
    var msg = new WebIM.message('txt', id);
    msg.set({
        msg: this.data.inputValue,//输入框的文本
        to: 'u0',
        roomType: false,
        success: function (id, serverMsgId) {

        }
    });
    msg.body.chatType = 'singleChat';
    WebIM.conn.send(msg.body);
  },

  receiveMsg: function (msg, type) {
    console.log(msg);
  }

})