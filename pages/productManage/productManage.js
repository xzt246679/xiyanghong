// pages/productManage/productManage.js
var app = getApp();
/**
 * 分页插件：.getPager()
 */
var pager = require('../../utils/pager.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList:[{},{},{}],
    getLoding:false,
    getLodingComplate:false,
    pageNum: 1,
    pagerArrs:[],
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
      merchantId:options.merchantId,
    })
    //that.getProductList();
    var data = {
      //'merchantId':options.merchantId,
      validFlag:1,
    };
    pager.getPager(app.globalData.url + "/system/product/miniList",data,that.data.pageNum,2,'',function(res){
      //console.log(res);
      that.setData({
        total:res.data.total,
      });
      that.getPagerData(that.data.pageNum, res);
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

  /**
   * 获取该商铺所有商品
   */
  getProductList:function(){
    var that = this;
    wx.request({
      url: app.globalData.url + '',
      method:"GET",
      header: {
        "token": wx.getStorageSync('token'),
      },
      data:{
        'orderByColumn':'',
        'merchantId':that.data.merchantId,
      },
      success:function(res){
        if(res.data.code){
          var list = res.data.data;
          that.setData({
            productList:list
          });
        } else {
          wx.showToast({
            title: res.errmsg,
            icon:"none"
          })
        }
      }
    })
  },

  /**
   * 跳转添加商品页面
   */
  toAddProduct:function(){
    wx.navigateTo({
      url: '/pages/addProduct/addProduct',
    })
  },

  /**
   * 跳转编辑商品页面
   */
  toUpdateProduct:function(e){
    var productId = e.currentTarget.dataset.product;
    wx.navigateTo({
      url: '/pages/updateProduct/updateProduct',
    })
  },

  /**
   * 修改商品状态
   */
  changeStatus:function(e){
    var productId = e.currentTarget.dataset.product;
    wx.request({
      url: app.globalData.url + '',
      method:"POST",
      header:{
        "Content-Type": "application/x-www-form-urlencoded",
        "token": wx.getStorageSync('token'),
      },
      data:{

      },
      success:function(res){
        if(res.data.code){
          
        } else {
          wx.showToast({
            title: res.errmsg,
            icon:"none"
          })
        }
      }
    })
  },

  /**
   * 删除商品
   */
  delProduct:function(e){
    var productId = e.currentTarget.dataset.product;
    wx.showModal({
      title:"提示",
      content: '确定要删除该商品吗？',
      success:function(sm){
        if(sm.confirm){
          wx.request({
            url: app.globalData.url + '',
            method:"POST",
            header:{
              "Content-Type": "application/x-www-form-urlencoded",
              "token": wx.getStorageSync('token'),
            },
            data:{
      
            },
            success:function(res){
              if(res.data.code == 0){
                wx.showToast({
                  title: '删除成功！',
                  icon:"success",
                })
              } else {
                wx.showToast({
                  title: res.errmsg,
                  icon:"none"
                })
              }
            }
          });
        } else {

        }
      }
    })
  },

  /**
   * 滚动到页面最底下时触发的事件
   */
  getPagerEvent:function(){
    var that = this;
    //console.log(that.data.getLoding + '---' + that.data.getLodingComplate);
    //没有正在请求数据并且没有加载全部数据
    if(!that.data.getLoding && !that.data.getLodingComplate){
      var pageNum = that.data.pageNum;
      var data = {
        //'merchantId':that.data.merchantId
      };
      that.setData({
        pageNum:pageNum+1,
        getLoding:true
      });
      pager.getPager(app.globalData.url + "/system/product/miniList",data,pageNum+1,2,'',function(res){
        //console.log(res);
        that.getPagerData(that.data.pageNum, res);
      });
    }
  },

  navBack: function () {
    wx.navigateBack({
    })
  },

  /**
   * 
   * @param {向当前页面的某个AppData的数组中添加新数组} param 
   */
  getPagerData(page, param){
    var that = this;
    var pageNum = that.data.pageNum;
    var pagerArrs = that.data.pagerArrs;
    pagerArrs[pageNum-1] = param.data.rows
    that.setData({
      pagerArrs:pagerArrs,
      getLoding: false,
    });
    var productCount = 0;
    for(var i = 0; i < pagerArrs.length; i++){
      var arr = pagerArrs[i];
      for(var j = 0; j < arr.length; j++){
        productCount++;
      }
    }
    if(that.data.total <= productCount){
      that.setData({
        getLodingComplate:true,
      })
    }
  },
})