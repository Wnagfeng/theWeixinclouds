// app.js
App({
  globalData: {
    screenWidth: 375,
    screenHeight: 667
  },
  // 当小程序初始化完成以后
  onLaunch() {
    wx.getSystemInfo({
      success: (result) => {
        this.globalData.screenHeight = result.screenHeight,
          this.globalData.screenWidth = result.screenWidth
      }
    })
  }

})