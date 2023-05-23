// pages/main-music/main-music.js
import {
  getimgheigt
} from '../../utils/getimgheight'
import {
  getBannerList,
  getHoutplaylist,
  getplaylist,
} from '../../service/music'
import {
  constant,
  throttle
} from 'underscore'
import {
  useRankingStore
} from '../../stores/ReankingList'
const qureySelectThorttle = throttle(getimgheigt, 100)
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    Searchvalue: '',
    banners: [],
    bannerHeight: 0,
    recommendlist: [],
    houtplaylist: [],
    screenWidth: 375,
    screenHeight: 667,
    recMenulist: []
  },
  onsearchCLick() {
    wx.navigateTo({
      url: '/pages/main-search/main-search',
    })
  },
// 点击更多按钮跳转的页面
  onrecommendMoreClick() {
    wx.navigateTo({
      url: '/pages/morepage/morepage',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getbannderdata()
    //  对公共数据的监听
    useRankingStore.onState("recommendlist", (newvalue) => {
      this.setData({
        recommendlist: newvalue.slice(0, 6)
      })
    })
    // 发请求获取公共数据
    useRankingStore.dispatch("fetchgetplaylistData")
    // 发请求获取热门歌单数据
    this.getHoutplaylistdata()
    // 发请求获取推荐歌单数据
    this.getrecmuenlist()

    // 把当前设备的屏幕尺寸设置过去
    this.setData({
      screenWidth: app.globalData.screenWidth,
    })
  },
  // 在组件卸载以后我们需要取消监听
  onUnload() {
    useRankingStore.offState("recommendlist", (newvalue) => {
      this.setData({
        recommendlist: newvalue.slice(0, 6)
      })
    })
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

  // 发请求获取热门歌单的数据进行展示
  async getHoutplaylistdata() {
    const res = await getHoutplaylist()
    this.setData({
      houtplaylist: res.playlists
    })
  },
  // 获取华语歌单作为推荐的歌单
  async getrecmuenlist() {
    const res = await getHoutplaylist("华语")
    this.setData({
      recMenulist: res.playlists
    })
  }
})