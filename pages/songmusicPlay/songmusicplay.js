// pages/songmusicPlay/songmusicplay.js
import {
  getpalysonginfo,
  getpalysonglyric
} from '../../service/play'
import {
  throttle
} from 'underscore'
import {
  parseLyric
} from '../../utils/lyric-parse'
const app = getApp()
// 创建播放上下文
const audioCOntete = wx.createInnerAudioContext()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    songId: -1,
    palysonginfo: {},
    palysonglyric: [],
    currentLyricText: "",
    currentLyricIndex: -1,
    statusBarHeight: 40,
    cureentpageindex: 0,
    currentpageheight: 0,
    currenttitem: 0,
    songduartion: 0,
    sliderValue: 0,
    isChangeing: false,
    iswaite: false,
    isplay: true
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
    // 播放当前歌曲
    audioCOntete.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
    audioCOntete.autoplay = true
    const palysongCruurenttime = audioCOntete.currentTime
    const throttleUpdata = throttle(this.uodata, 800, {
      leading: false,
      trailing: false
    })
    this.setData({
      currenttitem: palysongCruurenttime * 1000
    })
    // 监听播放的时间
    audioCOntete.onTimeUpdate((res) => {
      if (!this.data.isChangeing && !this.data.iswaite) {
        throttleUpdata()
      }
      // 根据当前播放的时间获取到对应的歌词
      if (!this.data.palysonglyric.length) return
      let index = this.data.palysonglyric.length - 1
      for (let i = 0; i < this.data.palysonglyric.length; i++) {
        const info = this.data.palysonglyric[i]
        if (info.time > audioCOntete.currentTime * 1000) {
          index = i - 1;
          break
        }
      }
      if (index === this.data.currentLyricIndex) return
      this.setData({
        currentLyricIndex: index,
        currentLyricText: this.data.palysonglyric[index].content
      })
      if (audioCOntete.paused) {
        this.setData({
          isplay: false
        })
      } else {
        this.setData({
          isplay: true
        })
      }
    })
  },
  uodata() {
    // 记录一下当前的播放时间
    const palysongCruurenttime = audioCOntete.currentTime
    // 获取到当前的歌曲总时间
    this.setData({
      currenttitem: palysongCruurenttime * 1000
    })
    // 修改滑块的时间
    const sliderValue = this.data.currenttitem / this.data.songduartion * 100
    this.setData({
      sliderValue: sliderValue
    })
  },
  onsliderChange(event) {
    this.data.iswaite = true
    setTimeout(() => {
      this.data.iswaite = false
    }, 1000)
    if (!this.data.isChangeing) {
      // 拿到当前的点击的位置
      const value = event.detail.value
      // 根据当前的滑块位置的百分比来计算音乐的播放位置百分比
      const currenttitem = value / 100 * this.data.songduartion //刚好直接是毫秒
      console.log(currenttitem / 1000)
      // 把点击滑块的音乐位置设置给音乐播放的位置
      audioCOntete.seek(currenttitem / 1000) //设置音乐的进度是秒
      this.setData({
        currenttitem,
        // 当用户停止滑动把滑动状态设置为false
        isChangeing: false,
        sliderValue: value
      })
      // bug处理 当点击完成以后时间就不在改变了
      // bug原因 他的监听在你改变进度以后就监听不到了 这个就很难受所以我们需要在改变进度以后重新让他监听起来
      audioCOntete.onWaiting(() => {
        // 在等待过程中先暂停播放
        audioCOntete.pause()
      })
      // 等到你可以播放的时候在播放一下
      audioCOntete.onCanplay(() => {
        audioCOntete.play()
      })
    }
  },
  onsliderchangeing(event) {
    this.setData({
      isChangeing: true
    })
    // 滑动中不要给我改变音乐 滑动停止了给我改变一下
    // 拿到当前的点击的位置
    const value = event.detail.value
    this.setData({
      currenttitem: value / 100 * this.data.songduartion
    })
    // 在他给我滑动的过程中你上面就不要给我设置时间了要不然来回跳
  },
  async getsonginfo(id) {
    const res = await getpalysonginfo(id)
    this.setData({
      palysonginfo: res.songs[0],
      songduartion: res.songs[0].dt
    })
  },
  async getsonglyric(id) {
    const res = await getpalysonglyric(id)
    this.setData({
      palysonglyric: parseLyric(res.lrc.lyric)
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
  onbandplay() {
    if (!audioCOntete.paused) {
      audioCOntete.pause()
      this.setData({
        isplay: false
      })
    } else {
      audioCOntete.play()
      this.setData({
        isplay: true
      })
    }
  }

})