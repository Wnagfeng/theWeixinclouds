// pages/main-profile/profile.js
import {
  Songscollection
} from '../../dataBase/index'
import {
  useSongsStore
} from '../../stores/songs'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    islogion: false,
    menuName: '',
    isshowDialog: false,
    songs: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 判断用户是否已经登录
    const userinfo = wx.getStorageSync('userinfo')
    const openid = wx.getStorageSync('openid')
    this.setData({
      islogion: !!openid
    })
    if (this.data.islogion) {
      this.setData({
        userInfo: userinfo
      })
    }

    // 创建的歌单的数据监听
    useSongsStore.onState("songlist", this.handelsonglist)

  },
  onUnload() {
    useSongsStore.offState("songlist", this.handelsonglist)
  },
  async onLoginTab() {
    const userinfo = await wx.getUserProfile({
      desc: '获取您的用户信息',
    })


    const res = await wx.cloud.callFunction({
      name: "main-login"
    })
    const openid = res.result.openid

    // 对数据进行本地存储
    wx.setStorageSync('userinfo', userinfo.userInfo)
    wx.setStorageSync('openid', openid)


    // 判断用户是否已经登录
    const getuserinfo = wx.getStorageSync('userinfo')
    const getopenid = wx.getStorageSync('openid')
    this.setData({
      islogion: !!getopenid
    })
    if (this.data.islogion) {
      this.setData({
        userInfo: getuserinfo
      })
    }
  },
  onfavorClick() {
    wx.navigateTo({
      url: "/pages/morepage/morepage?pagetype=profile&type=Favor&title=我的收藏",
    })
  },
  onlikeClick() {
    wx.navigateTo({
      url: '/pages/morepage/morepage?pagetype=profile&type=Like&title=我的喜欢',
    })
  },
  onHistoryClick() {
    wx.navigateTo({
      url: '/pages/morepage/morepage?pagetype=profile&type=History&title=我的历史',
    })
  },
  onaddCLick() {
    this.setData({
      menuName: ''
    })
    this.setData({
      isshowDialog: true
    })
  },
  onitemCLick(event) {
    const songs=event.currentTarget.dataset.songs
    // 跳转页面拿到当当前的歌单数据并且进行展示
    wx.navigateTo({
      url:`/pages/morepage/morepage?type=songs&songsid=${songs._id}`
    })

  },
  async onConfirmTab() {
    // 获取创建的歌单名称 
    const menuName = this.data.menuName
    // 简单模拟数据
    const songs = {
      name: menuName,
      songs: []
    }
    const res = await Songscollection.add(songs)
    if (res) {
      wx.showToast({
        title: '歌单创建成功',
      })
      useSongsStore.dispatch("fetchMenulistAction")
    }
  },
  handelsonglist(value) {
    this.setData({
      songs: value
    })
  }
})