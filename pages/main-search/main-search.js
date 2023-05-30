import {
  getsearchData
} from '../../service/search'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Searchvalue: '',
    searchkeys: '',
    searchSongs: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  onsearchCLick(event) {
    this.setData({
      searchkeys: event.detail
    })
    this.getsearchData(event.detail)
  },
  search(event) {
    this.getsearchData(this.data.searchkeys)
  },
  async getsearchData(key) {
    const res = await getsearchData(key)
    if (res.result.songs) {
      this.setData({
        searchSongs: res.result.songs
      })
    }

  }
})