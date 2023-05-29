// pages/songListDetalile/songListDetalile.js
import {
  songListDetaile,
  getHoutplaylist
} from '../../service/music'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songlistdetail: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getSongListDetaile()
  },
  async getSongListDetaile() {
    const res = await songListDetaile()
    // 获取到所有的列表
    const tags = res.tags
    // 创建一个promise数组方便后期使用all方法来一起拿到所有的数据
    const allpromises = [];
    // 根据所有的类别的name去请求每个name的数据
    for (const item of tags) {
      const promises=getHoutplaylist(item.name)
      allpromises.push(promises)
    }
    Promise.all(allpromises).then(res => {
      console.log(res)
      this.setData({
        songlistdetail: res
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
  },
  onsonglistCLick(){
    console.log(this.data.songlistdetail)
  }

})