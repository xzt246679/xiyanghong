/**
 * zsh
 * @param {请求路径} requestUrl 
 * @param {请求方式：true为post方式，默认false} method 
 * @param {请求参数} data 
 * @param {请求页数} pageNum 
 * @param {每页数据条数} pageSize 
 * @param {排序方式} orderBy ()
 * @param {请求成功的回调函数} callback 
 */
function getPager(requestUrl, data, pageNum, pageSize, orderBy, callback){
  var result;
  data.pageSize = pageSize;
  data.pageNum = pageNum;
  if(orderBy != undefined || orderBy == ''){
    data.orderByColumn = orderBy;
  }
  wx.request({
    url: requestUrl,
    data: data,
    async:false,
    method: "POST",
    header: {'content-Type': 'application/x-www-form-urlencoded','token':wx.getStorageSync('token')},
    success: function(res){
      if(res.data.code == 0){
        callback(res);
      } else {
        wx.showToast({
          title: res.data.msg,
          icon:"none"
        })
      }
    } 
  })
}

module.exports = {  
  getPager: getPager
}