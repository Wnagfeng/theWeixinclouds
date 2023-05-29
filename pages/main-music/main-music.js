// pages/main-music/main-music.js
import {
  getimgheigt
} from '../../utils/getimgheight'
import {
  useplatListstore
} from '../../stores/palyList'
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
import {
  usesugerlistStore
} from '../../stores/surgeList'
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
    recommendlist: [], //推荐歌曲数据
    houtplaylist: [],
    screenWidth: 375,
    screenHeight: 667,
    recMenulist: [], //推荐歌单数据
    rankingListData: {} //飙升榜单数据
  },
  onsearchCLick() {
    wx.navigateTo({
      url: '/pages/main-search/main-search',
    })
  },
  // 点击更多按钮跳转的页面
  onrecommendMoreClick() {
    wx.navigateTo({
      url: '/pages/morepage/morepage?pagetype=recommendlist&pageID=recommend',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getbannderdata()
    //  对公共数据的监听
    useRankingStore.onState("recommendlist", this.handelrecommendlist)


    usesugerlistStore.onState("newRanking", this.handelnewRanking)
    usesugerlistStore.onState("orginRanking", this.handelorginRanking)
    usesugerlistStore.onState("upRanking", this.handelupRanking)


    // test-----------
    // 妈个比 在store那边把数据放到一起到这边直接使用 就是不行操蛋 2023年5月25日10:24:20 我感觉可能是监听深度问题可能数据没拿到但是在appdata中都能看见而且数据结构都是一样的为啥不给我使用 只能是我菜吧！
    // usesugerlistStore.onState("rankinglistdata", this.handelAllrankinglistdata)
    // test------------


    // 发请求获取公共数据
    useRankingStore.dispatch("fetchgetplaylistData")
    usesugerlistStore.dispatch("fetchgetrankinglistdata")
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
    useRankingStore.offState("recommendlist", this.handelrecommendlist)
    usesugerlistStore.offState("newRanking", this.handelnewRanking)
    usesugerlistStore.offState("orginRanking", this.handelorginRanking)
    usesugerlistStore.offState("upRanking", this.handelupRanking)
  },
  // 监听的函数
  handelrecommendlist(newvalue) {
    this.setData({
      recommendlist: newvalue?.tracks?.slice(0, 6)
    })
  },


  handelnewRanking(newvalue) {
    const NewrankingListData = {
      ...this.data.rankingListData,
      newRanking: newvalue
    }
    this.setData({
      rankingListData: NewrankingListData
    })
  },
  handelorginRanking(newvalue) {
    const NewrankingListData = {
      ...this.data.rankingListData,
      orginRanking: newvalue
    }
    this.setData({
      rankingListData: NewrankingListData
    })
  },
  handelupRanking(newvalue) {
    const NewrankingListData = {
      ...this.data.rankingListData,
      upRanking: newvalue
    }
    this.setData({
      rankingListData: NewrankingListData
    })
  },


  // test----------------
  // handelAllrankinglistdata(newvalue) {
  //   this.setData({
  //     rankingListData: newvalue
  //   })
  // },
  // test----------------


  // 网络请求的函数
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
  },

  // 歌单点击事件的处理
  onplaylistV1Click(event) {
    useplatListstore.setState("playListData", this.data.recommendlist)
    useplatListstore.setState("playLiseIndex", event.currentTarget.dataset.indey)
  }

})