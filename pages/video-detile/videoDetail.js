import {
  getMvurl,
  getMvInfo,
  getRelatedMv
} from '../../service/video'
Page({
  data: {
    id: 0,
    mvurl: "",
    mvinfo: {},
    relatedmv:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id: options.id
    })
    this.getmvurl()
    this.getmvinfo()
    this.getrelatedmv()
  },

  async getmvurl() {
    const res = await getMvurl(this.data.id)
    this.setData({
      mvurl: res.data.url
    })
  },
  async getmvinfo() {
    const res = await getMvInfo(this.data.id)
    this.setData({
      mvinfo:res.data
    })
  },

  async getrelatedmv(){
    const res= await getRelatedMv(this.data.id)
    this.setData({
      relatedmv:res.data
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