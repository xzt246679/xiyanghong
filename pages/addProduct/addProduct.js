// pages/addProduct/addProduct.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectShow: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectType: ["水果","蔬菜","家电","医疗"],//下拉列表的数据
    index: 0,//选择的下拉列表下标
    imagesList:[],
    imageUrl:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      navT: app.globalData.navTop,
      navLH: app.globalData.navLineHeight,
      navH: app.globalData.navHeight,
      partId:options.partId,
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

  // 点击下拉显示框
  selectTap() {
    this.setData({
      selectShow: !this.data.selectShow
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index: Index,
      selectShow: !this.data.selectShow
    });
  },

  /**
   * 上传图片
   */
  addImage: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        //const imagesList = that.data.imagesList.concat(tempFilePaths);
        //启动上传等待中...  
        setTimeout(() => {
          wx.showLoading({
            title: '正在上传...',
            icon: 'loading'
          });
          var filetype = tempFilePaths[0].split(".");
          wx.uploadFile({
            //上传图片的接口
            url: app.globalData.url + '',
            filePath: tempFilePaths[0],
            name: 'files',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              "token": wx.getStorageSync('token'),
            },
            formData: {
              'filetype': 0,
              "filesFileName": "qqq." + filetype[filetype.length - 1]
            },
            success(res) {
              wx.hideLoading();
              var data = JSON.parse(res.data);
              if (data.code == 0) {
                that.setData({
                  imageUrl: data.data,
                })
                var list = that.data.imageList;
                list.push(that.data.imageUrl);
                that.setData({
                  imagesList: list
                });
  
                wx.showToast({
                  title: '上传成功',
                });
              } else {
                wx.showToast({
                  title: '上传失败,稍后重试',
                  icon:"none",
                })
              }
            },
            fail: function () {
              wx.hideLoading();
            }
          });
        }, 500);
      },
      fail: function (res) {
        wx.hideLoading();
      }
    })
  },

  /**
   * 添加按钮点击事件
   */
  addEvent:function(){
    var that = this;
    //验证参数
    if(that.isValid()){
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

          } else {
            wx.showToast({
              title: res.errmsg + '',
              icon:'none'
            })
          }
        }
      })
    }
  },

  /**
   * 验证参数是否合法
   */
  isValid:function(){
    var that = this;
    if(that.data.title.length <= 0 || that.data.title.trim() == ""){
      wx.showToast({
        title: '请输入商品名称',
        icon:"none"
      });
      return false;
    }

    if(that.data.price < 0 || !isNaN(that.data.price)){
      wx.showToast({
        title: '请输入正确的价格',
        icon:"none"
      });
      return false;
    }

    if(that.data.realPrice < 0 || !isNaN(that.data.realPrice)){
      wx.showToast({
        title: '请输入正确的原价',
        icon:"none"
      });
      return false;
    }

    if(that.data.inventory <= 0 || !isNaN(that.data.inventory)){
      wx.showToast({
        title: '请输入商品名称',
        icon:"none"
      });
      return false;
    }
    return true;
  },

  getTitle:function(e){
    var that = this;
    that.setData({
      title:e.detail.value,
    });
  },

  getPrice:function(e){
    var that = this;
    that.setData({
      price:e.detail.value,
    });
  },

  getRealPrice:function(e){
    var that = this;
    that.setData({
      realPrice:e.detail.value,
    });
  },

  getInventory:function(e){
    var that = this;
    that.setData({
      inventory:e.detail.value,
    });
  },

  navBack: function () {
    wx.navigateBack({
    })
  },
})