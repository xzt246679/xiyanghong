//获取应用实例
let WebIM = require("../../utils/WebIM")["default"];
let __test_account__, __test_psword__;
let disp = require("../../utils/broadcast");
// __test_account__ = "easezy";
// __test_psword__ = "111111";
let runAnimation = true
var app = getApp();
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,
    wxcode: ""
  },
  onShow: function () {
  },
  onLoad: function (options) {
    //获取手机高度
    this.setData({
      navT: app.globalData.navTop,
      navLH: app.globalData.navLineHeight,
      navH: app.globalData.navHeight
    })
    var that = this;
    this.setData({
      syscategoryid: options.syscategoryid,
      categoryName: options.categoryName,
      bcak: options.bcak
    })
    //console.info(options);
    that.userLogin();
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // // 获取到用户的信息了，打印到控制台上看下
      // console.log("用户的信息如下：");
      console.log(e.detail.userInfo)
      wx.getStorageSync("status");
      wx.setStorageSync("userInfo", e.detail.userInfo);
      that.onLogin();
    } else {
      //拒绝授权登录
      wx.switchTab({
        url: '/pages/accredit/index'
      });
    }

    wx.showLoading({
      title: '正在授权……',
    })
  },

  userLogin: function() {
    var that = this;
    wx.checkSession({
      success: function () {
        //存在登陆态
      },
      fail: function () {
        //不存在登陆态
        that.onLogin()
      }
    })
  },
 
  onLogin: function() {
    var that = this;
    wx.login({
      success: function (res) {
        
        if (res.code) {
          console.log(res.code);
          wx.request({
            url: app.globalData.url + '/xiyanghong/wxLogin',
            method:"POST",
            async:false,
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            }, 
            data: {
              code: res.code,
              validFlag:true
            },
            success: function (res) {
              console.log(res);
              const self = this
              if (res.data.code == 0) {
                //获取到用户凭证 存儲 3rd_session 
                wx.setStorage({
                  key: "third_Session",
                  data: res.data.data.third_session
                })
                wx.setStorage({
                  key: "token",
                  data: res.data.data.token
                })
                that.getUserInfo();
              } else {
                wx.showToast({
                  title: res.data.msg + '',
                  icon:"none",
                })
              }
            },
            fail: function (res) {

            }
          });

          

        }
      },
      fail: function (res) {

      }
    })

  },
 
  getUserInfo: function() {
    var that = this;
    
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              // 用户已经同意小程序使用功能，后续调用 wx.scope.userInfo 接口不会弹窗询问
              wx.getUserInfo({
                success: function (res) {
                  
                  var userInfo = res.userInfo
                  that.userInfoSetInSQL(userInfo)
                },
                fail: function () {

                }
              })
            }
          })
        }else{
          
          wx.getUserInfo({
            success: function (res) {
              var userInfo = res.userInfo
              that.userInfoSetInSQL(userInfo)
            },
            fail: function () {

            }
          })
        }
      }
    })
    
    
  },
 
  userInfoSetInSQL: function(userInfo) {
    var that = this;
    wx.getStorage({
      key: 'third_Session',
      success: function (res) {
       
        wx.request({
          url: app.globalData.url + '/xiyanghong/userInfo',
          async:false,
          method:"POST",
          header:{
            "Content-Type": "application/x-www-form-urlencoded",
            "token": wx.getStorageSync('token'),
          },
          data: {
            third_Session: res.data,
            nickName: userInfo.nickName,
            avatarUrl: userInfo.avatarUrl,
            gender: userInfo.gender,
            validFlag:true
          },
          success: function (res) {
            console.log(res.data)
            if (res.data.code == 0) {
              //此处将用户在项目服务器的数据保存到缓存
              wx.setStorageSync("user", res.data.data);
              
              //登录环信im账号
              app.conn.open({
                apiUrl: WebIM.config.apiURL,
                user: res.data.data.opinId,
                pwd: 'OK',
                grant_type: 'password',
                appKey: WebIM.config.appkey
              });
              wx.setStorageSync("status", true);
              //此处是正常授权登录完成，跳转首页
              wx.switchTab({
                url: '/pages/index/index',
              })
            } else {
              
            }
          }
        })
      }
    })
  },
  
})
