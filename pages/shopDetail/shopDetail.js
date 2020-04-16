// pages/shopDetail/shopDetail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:0,//默认显示商品，1为显示商家信息
    typeList:[{},{},{},{}],//商品分类的列表
    selectedType:'',//当前选中的分类
    productList:[[{},{},{}],[{},{}],[{}],[{}]],//商品列表（按照分类，每个分类放进一个数组）
    hideModal: true,//默认不显示模态框
    cartList:[{},{},{},{}],//购物车列表
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
   * 商家信息和全部商品按钮的点击事件
   */
  changeShow:function(){
    var that = this;
    var show = 0;
    if(that.data.show == 0){
      show = 1;
    }
    that.setData({
      show:show,
    })
  },

  /**
   * 选择分类
   */
  choooseType:function(e){
    var that = this;
    var href = e.currentTarget.dataset.href;
    that.setData({
      selectedType:href,
    })
  },

  /**
   * 获取购物车信息
   */
  getCartList:function(){
    var that = this;
    wx.request({
      url: app.globalData.url + '',
      method:"POST",
      header:{
        "Content-Type": "application/x-www-form-urlencoded",
        "token": wx.getStorageSync('token')
      },
      data:{
        "userId":wx.getStorageSync('user').id,
        "shopId":that.data.shopId,
      },
      success:function(res){
        if(res.data.code == 0){
          that.setData({
            cartList:res.data.data,
          });
        }
      }
    })
  },

  /**
   * 加到购物车
   */
  addToCart:function(e){
    var that = this;
    var productId = e.currentTarget.dataset.id;
    wx.request({
      url: app.globalData.url + '',
      method:"POST",
      header:{
        "Content-Type": "application/x-www-form-urlencoded",
        "token": wx.getStorageSync('token')
      },
      data:{},
      success:function(res){
        if(res.data.code == 0){
          wx.showToast({
            title: '添加成功！',
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon:'none',
          })
        }
      },
    })
  },

  /**
   * 联系商家
   */
  toChat:function(){
    var that = this;
    wx.makePhoneCall({
      phoneNumber: '13006556659',
    })
  },

  /**
   * 显示购物车的模态框
   */
  showCart:function(){
    var that = this;
    that.setData({
      hideModal: false
    })
    var animation = wx.createAnimation({
      duration: 300,//动画的持续时间 默认600ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    setTimeout(function () {
      that.fadeIn();//调用显示动画
    }, 200)
  },

  /**
   * 隐藏购物车模态框
   */
  hideCart: function () {
    var that = this;
    var animation = wx.createAnimation({
      duration: 800,//动画的持续时间 默认800ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    that.fadeDown();//调用隐藏动画   
    setTimeout(function () {
      that.setData({
        hideModal: true
      })
    }, 720)//先执行下滑动画，再隐藏模块
 
  },

  /**
   * 模态框渐入
   */
  fadeIn: function () {
    this.animation.translateY(0).step()
    this.setData({
      animationData: this.animation.export()//动画实例的export方法导出动画数据传递给组件的animation属性
    })
  },
  /**
   * 模态框渐出
   */
  fadeDown: function () {
    this.animation.translateY(300).step()
    this.setData({
      animationData: this.animation.export(),
    })
  },

  /**
   * 购物车减号点击事件
   */
  subNum:function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    var cartList = that.data.cartList;
    if(cartList[index].num >= cartList[index].库存){
      wx.showToast({
        title: '超出库存数量！',
        icon:'none'
      });
    } else {
      cartList[index].num++;
      that.setData({
        cartList:cartList
      });
    }
  },

  /**
   * 购物车加号点击事件
   */
  addNum:function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    var cartList = that.data.cartList;
    if(cartList[index].num <= 1){
      cartList.splice(index,1);
    } else {
      cartList[index].num--;
    }
    that.setData({
      cartList:cartList
    });
  },

  /**
   * 返回上一页
   */
  navBack: function () {
    wx.navigateBack({
    })
  },
})