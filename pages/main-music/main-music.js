// pages/main-music/main-music.js
import {
  getimgheigt
} from '../../utils/getimgheight'
import {
  getBannerList
} from '../../service/music'
import {
  throttle
} from 'underscore'

const qureySelectThorttle = throttle(getimgheigt,100)
Page({
  /**
   * 页面的初始数据
   */
  data: {
    Searchvalue: '',
    banners: [],
    bannerHeight: 0
  },
  onsearchCLick() {
    wx.navigateTo({
      url: '/pages/main-search/main-search',
    })
  },

  onrecommendMoreClick(){
    console.log(11)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getbannderdata()
  },
  async getbannderdata() {
    const res = await getBannerList()
    this.setData({
      banners: res.banners
    })
  },

  async onimgelod() {
    // 创建查询对象
    const res = await qureySelectThorttle(".imgs")
    this.setData({
      bannerHeight: res[0].height
    })
  },
  
})
