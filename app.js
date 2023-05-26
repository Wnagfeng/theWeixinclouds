// app.js
App({
  globalData: {
    screenWidth: 375,
    screenHeight: 667,
    statusBarHeight: 40,
    currentpageheight: 0
  },
  // 当小程序初始化完成以后
  onLaunch() {
    wx.getSystemInfo({
      success: (result) => {
        this.globalData.screenHeight = result.screenHeight,
          this.globalData.screenWidth = result.screenWidth,
          this.globalData.statusBarHeight = result.statusBarHeight
        this.globalData.currentpageheight = result.screenHeight - result.statusBarHeight - 44
      }
    })
  }

})