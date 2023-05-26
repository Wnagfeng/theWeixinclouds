// pages/songmusicPlay/songmusicplay.js
import {
  getpalysonginfo,
  getpalysonglyric
} from '../../service/play'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    songId: -1,
    palysonginfo: {},
    palysonglyric: "",
    statusBarHeight: 40,
    cureentpageindex: 0,
    currentpageheight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const id = options.id
    this.setData({
      songId: id
    })
    // 根据id去获取到歌曲的信息进行展示
    this.getsonginfo(id)
    this.getsonglyric(id)
    this.setData({
      statusBarHeight: app.globalData.statusBarHeight,
      currentpageheight: app.globalData.currentpageheight
    })
  },

  async getsonginfo(id) {
    const res = await getpalysonginfo(id)
    this.setData({
      palysonginfo: res.songs[0]
    })
  },
  async getsonglyric(id) {
    const res = await getpalysonglyric(id)
    this.setData({
      palysonglyric: res.lrc.lyric
    })
  },
  onswiperchange(event) {
    this.setData({
      cureentpageindex: event.detail.current
    })
  },
  onnavtabitem(event) {
    this.setData({
      cureentpageindex: event.currentTarget.dataset.index
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})