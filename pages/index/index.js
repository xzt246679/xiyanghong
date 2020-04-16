//index.js
//获取应用实例
const app = getApp()
var pager = require('../../utils/pager.js');
Page({
  data: {
    constant:[
      {
        "title":"月嫂招聘",
        "pic":"../../img/logo.jpg"
      },{
        "title":"短期工招聘",
        "pic":"../../img/logo.jpg"
      },{
        "title":"我要求职",
        "pic":"../../img/logo.jpg"
      },{
        "title":"房屋出租",
        "pic":"../../img/logo.jpg"
      },{
        "title":"相亲交友",
        "pic":"../../img/logo.jpg"
      },{
        "title":"打羽毛球",
        "pic":"../../img/logo.jpg"
      },{
        "title":"店铺转让",
        "pic":"../../img/logo.jpg"
      },{
        "title":"求舞伴",
        "pic":"../../img/logo.jpg"
      }
    ],
    userInfo: {},
    test:10,
    tabbar:0,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    var that = this;
    that.setData({
      navT: app.globalData.navTop,
      navLH: app.globalData.navLineHeight,
      navH:app.globalData.navHeight,
    })

    wx.checkSession({
      fail:function(res){
        wx.reLaunch({
          url: '/pages/accredit/index'
        })
        return;
      }
    })

    wx.getSetting({
      success(res){
        if(!res.authSetting["scope.userInfo"] || !wx.getStorageSync('status')){
          //未授权，跳转到授权页面
          wx.reLaunch({
            url: '/pages/accredit/index'
          })
          return;
        }
      }
    })


    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    that.getBanner();
    that.getConstant();
    //that.testAPI();
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  
  getBanner:function(){
    var that = this;
    wx.request({
      url: app.globalData.url + '/system/banner/miniList',//   /system/constant/miniList
      method:"POST",
      header:{'token':wx.getStorageSync('token'),'Content-Type': 'application/json'},
      data:{'validFlag':true},
      success:function(res){
        if(res.data.code != 0){
          wx.showToast({
            title: res.data.msg + '',
            icon:"none"
          })
        } else {
          that.setData({
            banner:res.data.data
          });
          
        }
      },
      
    })
  },

  getConstant:function(){
    var that = this;
    wx.request({
      url: app.globalData.url + '/system/modulars/miniList',//   /system/product/miniList   testAPI
      method:"POST",
      header:{
        'token':wx.getStorageSync('token'),
        'Content-Type': 'application/json'
      },
      data:{'validFlag':true},
      success:function(res){
        if(res.data.code != 0){
          wx.showToast({
            title: res.data.msg + '',
            icon:"none"
          })
        } else {
          that.setData({
            //constant:res.data.data
          });
        }
      }
    })
  },

  testAPI:function(){
    var that = this;
    wx.request({
      url: app.globalData.url + '/system/up/miniAdd',
      method:"POST",
      header:{
        'Content-Type': "application/x-www-form-urlencoded",
        'token':wx.getStorageSync('token'),
      },
      data:{
        "userId":wx.getStorageSync('user').id,
        'content':"16568a4dwfafgw",
        'location':'sdjkljahgagkl',
        'requiredNum':2,
        'paymentAmount':10,
        'registrationDeadline':'2020/05/05 00:00:11',
        'longitude':'125.12',
        'latitude':'180.55',
        'pictures':'dajkhgh;alskhd',
        'phone':'13006666666',
        'username':'username',
        'type':1,
        'sex':1,
        'projectId':1,
        'valid':true
      },
      success:function(res){
        if(res.data.code != 0){
          wx.showToast({
            title: res.data.msg + '',
            icon:"none"
          })
        } else {
          wx.showToast({
            title: res.data.msg + '',
          })
          that.setData({
            constant:res.data.data
          });
        }
      }
    })
  },

  getLocation:function(){
    var that = this;
    
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
