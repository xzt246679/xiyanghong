// pages/publishParty/publishParty.js
var app = getApp();
var dateTimePicker = require('../../utils/dateSelect.js');
Page({

  

  /**
   * 页面的初始数据
   */
  data: {
    num:'',
    price:'',
    date:'',
    time:'',
    imageList:[],
    date: '2018-10-01',
    time: '12:00',
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2050
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      navT: app.globalData.navTop,
      navLH: app.globalData.navLineHeight,
      navH: app.globalData.navHeight
    });

    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();
    
    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
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

  getNum:function(e){
    var that = this;
    that.setData({
      num:e.detail.value,
    });
    
  },

  getPrice:function(e){
    var that = this;
    that.setData({
      price:e.detail.value,
    });
  },

  getDate:function(e){
    var that = this;
    that.setData({
      date:e.detail.value,
    });
  },

  getTime:function(e){
    var that = this;
    that.setData({
      time:e.detail.value,
    });
  },

  getParaImg:function(){
    var that = this;
    var list = that.data.imageList;
    var para = '';
    for(var i = 0; i < list.length; i++){
      para += list[i] + ';';
    }
    para = para.substring(0,para.length-1);
    that.setData({
      paraImg:para
    })
  },

  /**
   * 提交审核
   */
  submitParty:function(){
    var that = this;
    if(!that.isValidParam()){
      return;
    }
    that.getParaImg();
    wx.request({
      url: app.globalData.url + '/system/up/miniAdd',
      method:"POST",
      header:{
        "Content-Type": "application/x-www-form-urlencoded",
        "token": wx.getStorageSync('token')
      },
      data:{
        userId:wx.getStorageSync('user').id,
        content:that.data.context,
        pictures:that.data.paraImg,
        location:"山东省潍坊市金字塔C塔125梯",
        phone:that.data.phone,
        requiredNum:that.data.num,
        validFlag:true,
        paymentAmount:that.data.price,
        registrationDeadline:'20' + that.data.dateTime1[0] + '-' + (that.data.dateTime1[1]+1) + '-' + (that.data.dateTime1[2]+1) + ' ' + that.data.dateTime1[3] + ':' + that.data.dateTime1[4],
      },
      success:function(res){
        if(res.data.code == 0){
          wx.showToast({
            title: '发布成功！',
          })
        } else {
          wx.showToast({
            title: res.errmsg + '',
            icon:"none",
          })
        }
      }
    })
  },

  getLocation:function(){
    var that=this;
    wx.getLocation({
      type: 'wgs84',
      success (res) {
        console.info(res);
      }
    })
  },

  getPhoneNumber (e) {
    var that = this;
    that.setData({
      phone:"13006666666"
    })
  },

  changeDate(e){
    this.setData({ date:e.detail.value});
  },
  changeTime(e){
    this.setData({ time: e.detail.value });
  },
  changeDateTime(e){
    this.setData({ dateTime: e.detail.value });
  },
  changeDateTime1(e) {
    this.setData({ dateTime1: e.detail.value });
  },
  changeDateTimeColumn(e){
    var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray: dateArr,
      dateTime: arr
    });
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({ 
      dateTimeArray1: dateArr,
      dateTime1: arr
    });
  },

  getContext:function(e){
    var that = this;
    that.setData({
      context:e.detail.value,
    })
  },

  /**
   * 添加图片
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
              "token": wx.getStorageSync('token')
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

  navBack: function () {
    wx.navigateBack({
    })
  },

  /**
   * 验证参数是否合法
   */
  isValidParam:function(){
    var that = this;
    var flag = true;
    console.log(that.data.context);
    if(that.data.context == undefined || that.data.context.length <= 0 || that.data.context.trim == ''){
      wx.showToast({
        title: '请输入有效内容',
        icon:'none'
      })
      flag = false;
    }
    if(that.data.location.length <= 0 || that.data.location.trim == ''){
      wx.showToast({
        title: '请选择有效地址',
        icon:'none'
      })
      flag = false;
    }
    if(!(/^1[34578]\d{9}$/.test(that.data.phone))){
      wx.showToast({
        title: '手机号有误',
        icon:'none'
      })
      flag = false;
    }
    if(that.data.num <= 0){
      wx.showToast({
        title: '请输入正确人数',
        icon:'none'
      })
      flag = false;
    }
    if(that.data.price <= 0 ){
      wx.showToast({
        title: '支付金额无效',
        icon:'none'
      })
      flag = false;
    }
    var dateStr = '20' + that.data.dateTime1[0] + '-' + (that.data.dateTime1[1]+1) + '-' + (that.data.dateTime1[2]+1) + ' ' + that.data.dateTime1[3] + ':' + that.data.dateTime1[4];
    var date = new Date(dateStr);
    console.log(date);
    if(date < new Date()){
      wx.showToast({
        title: '报名截止日期无效',
        icon:'none'
      })
      flag = false;
    }
    return flag;
    
  },

  /**
   * 删除图片
   */
  delImg:function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    var imageList = that.data.imageList;
        wx.showModal({
          title: '提示',
          content: '确定要删除该图片吗？',
          success: function (sm) {
            if (sm.confirm) {
              imageList.splice(index);
              that.setData({
                imageList:imageList,
              })
            } else if (sm.cancel) {
    
            }
          }
        })
    
  },

  /**
   * 添加图片
   */
  addImage:function(){
    var that = this;
    if (that.data.imageList.length >= 6){
      wx.showToast({
        title: '最多上传9张图片！',
        icon: "none",
      });
      return;
    }
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

            url: app.globalData.url + 'uploadFile',
            filePath: tempFilePaths[0],
            name: 'files',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            formData: {
              'filetype': 0,
              "filesFileName": "qqq." + filetype[filetype.length - 1]
            },
            success(res) {
              wx.hideLoading();
              var data = JSON.parse(res.data);
              if (data.result == 1) {
                that.setData({
                  imageUrl: data.data,
                })
              }
              var list = that.data.imageList;
              list.push(that.data.imageUrl);
              that.setData({
                imagesList: list
              });

              wx.showToast({
                title: '上传成功',
                icon: null,
              });
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
   * 获取定位
   */
  getLocation:function(){
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        var speed = res.speed;
        var accuracy = res.accuracy
        var ak = '';//去百度申请ak
        wx.request({
          url: 'https://api.map.baidu.com/reverse_geocoding/v3/?ak='+ ak +'&location=' + res.latitude + ',' + res.longitude + '&output=json',
          data: {},
          header: { 'Content-Type': 'application/json' },
          success: function (ops) {
            that.setData({
              city: ops.data.result.addressComponent.city
            });
            wx.setStorageSync("cityName", ops.data.result.addressComponent.city);
          },
          fail: function (resq) {
          },
        })
      }
    })
  },

   /**
    * 获取联系方式
    */
   getPhoneNumber:function(e){
    console.log(e.detail);
   },
})