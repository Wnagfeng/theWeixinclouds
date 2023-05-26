// pages/morepage/morepage.js
import {
  usesugerlistStore
} from '../../stores/surgeList'
import {
  useRankingStore
} from '../../stores/ReankingList'
import {
  getplaylist
} from '../../service/music'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cureentPageData: {},
    pageID: "",
    pagetype: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const pagetype = options.pagetype
    const pageID = options.pageID
    this.data.pageID = pageID
    this.data.pagetype = pagetype
    // 根据点击不同的类型去获取不同的数据
    // 根据传递过来的pagetype去监听数据的改变然后维护到data中
    console.log(options.pageID)
    console.log(options.pagetype)
    if (options.pageID === "ranking") {
      const pagetype = options.pagetype
      const pageID = options.pageID
      this.data.pageID = pageID
      this.data.pagetype = pagetype
      usesugerlistStore.onState(pagetype, this.handelpagetype)
    } else if (options.pageID === "recommend") {
      const pagetype = options.pagetype
      const pageID = options.pageID
      this.data.pageID = pageID
      this.data.pagetype = pagetype
      useRankingStore.onState(pagetype, this.handelpagetype)
    } else if (options.pagetype === "songitem") {
      const pagetype = options.pagetype
      const pageID = options.pageID
      this.data.pageID = pageID
      this.setData({
        pagetype
      })
      const id = options.pageID
      this.fetchgetgetplaylistData(id)
    }

  },

  handelpagetype(newvalue) {
    if (this.data.pageID === "ranking") {
      this.setData({
        cureentPageData: newvalue
      })
    } else if (this.data.pageID === "recommend") {
      this.setData({
        cureentPageData: newvalue
      })
    }

  },
  async fetchgetgetplaylistData(id) {
    const res = await getplaylist(id)
    this.setData({
      cureentPageData: res.playlist
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
    if (this.data.pageID === "ranking") {
      const pagetype = this.data.pagetype
      usesugerlistStore.offState(pagetype, this.handelpagetype)
    }
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