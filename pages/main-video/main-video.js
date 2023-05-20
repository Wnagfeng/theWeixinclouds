// pages/main-video/main-video.js
import {
  getTopmv
} from '../../service/video'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 数据列表
    topmvres: [],
    // 发请求的偏移量
    videoffset: 0,
    // 是否拥有更多数据
    hasmore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取topmv数据
    this.getTopmv()
  },
  async getTopmv() {
    // 发送请求获取数据
    const topmvres = await getTopmv(20, this.data.videoffset)
    // 将之前的数据和现在的数据进行合并
    const newvideolist = [...this.data.topmvres, ...topmvres.data]
    // 设置数据
    this.setData({
      topmvres: newvideolist
    })
    // 根据当前的数据的长度来获取下次数据的偏移量
    this.data.videoffset = this.data.topmvres.length
    // 判断数据是否拥有更多
    this.data.hasmore = topmvres.hasMore
  },

  // 滚动到底部发请求拿数据
  onReachBottom() {
    // 判断是否有更多的数据有数据才能继续请求数据 hasMore是服务器返回的字段 一个共只能返回50条 如果没有了就返回一个hasMore为false
    if (this.data.hasmore) {
      // 如果有更多数据才发请求获取数据
      this.getTopmv()
    }
  },

  // 下拉刷新--加载更多数据
  async onPullDownRefresh() {
    // 清空之前的数据重新拿到新的数据
    this.data.videoffset = 0
    this.data.topmvres = []
    this.data.hasmore = true
    await this.getTopmv()
    // 当数据回来以后我们就停止加载
    wx.stopPullDownRefresh()
  }
})