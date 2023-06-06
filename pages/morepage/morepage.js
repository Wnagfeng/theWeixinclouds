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
import {
  useplatListstore
} from '../../stores/palyList'
import {
  useSongsStore
} from '../../stores/songs'
import {
  Songscollection
} from '../../dataBase/index'
const db = wx.cloud.database()
const songsCollection = db.collection("Songs")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cureentPageData: {},
    pageID: "",
    pagetype: "",
    songs: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const pagetype = options.pagetype
    const pageID = options.pageID
    this.data.pageID = pageID
    // 根据点击不同的类型去获取不同的数据
    // 根据传递过来的pagetype去监听数据的改变然后维护到data中
    console.log(options.pageID)
    console.log(options.pagetype)
    if (options.pageID === "ranking") {
      const pagetype = options.pagetype
      const pageID = options.pageID
      this.data.pageID = pageID
      this.setData({
        pagetype: pagetype
      })
      usesugerlistStore.onState(pagetype, this.handelpagetype)
    } else if (options.pageID === "recommend") {
      const pagetype = options.pagetype
      const pageID = options.pageID
      this.data.pageID = pageID
      this.setData({
        pagetype: pagetype
      })
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
    } else if (options.pagetype === "profile") {
      const type = options.type
      const title = options.title
      this.setData({
        pagetype: pagetype
      })
      this.handelProfileLCick(type, title)
      // 当来到这里后我们需要去云数据库中请求我们的存储数据
    } else if (options.type === "songs") {
      const songsid = options.songsid
      // 根据传递进来的id去请求数据进行展示
      this.handelSongsData(songsid)

    }

    // 对歌单数据的监听
    useSongsStore.onState("songlist", this.handelSongs)

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
  async handelSongsData(songsid) {
    const id = songsid
    console.log(id)
    const res = await songsCollection.doc(songsid).get()
    const songsname = res.data.name
    const songsdata = res.data.songs
    this.setData({
      cureentPageData: {
        name: songsname,
        tracks: songsdata
      }
    })
  },
  async fetchgetgetplaylistData(id) {
    const res = await getplaylist(id)
    this.setData({
      cureentPageData: res.playlist
    })
  },
  async handelProfileLCick(type, title) {
    // 动态获取数据
    const collection = db.collection(type)
    const res = await collection.get()
    this.setData({
      cureentPageData: {
        name: title,
        tracks: res.data
      }
    })
  },
  handelSongs(value) {
    this.setData({
      songs: value
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
  onUnload() {
    useSongsStore.offState("songlist", this.handelSongs)
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
  onplaylistV2Click(event) {
    useplatListstore.setState("playListData", this.data.cureentPageData.tracks)
    useplatListstore.setState("playLiseIndex", event.currentTarget.dataset.indey)
  }
})