import {
  throttle
} from 'underscore'
import {
  useplatListstore,
  audioCOntete
} from '../../stores/palyList'

const app = getApp()

Page({
  data: {
    songId: -1,
    palysonginfo: {},
    palysonglyric: [],
    currentLyricText: "",
    currentLyricIndex: -1,

    statusBarHeight: 40,
    cureentpageindex: 0,
    currentpageheight: 0,

    lyricScrollTop: 0,
    currenttitem: 0,
    songduartion: 0,
    sliderValue: 0,
    isChangeing: false,
    iswaite: false,
    isplay: true,
    playListData: [],
    playlistIndex: 0,
    isFristPlay: true,
    playmoundINdex: 0
  },
  onLoad(options) {
    const id = options.id
    // 获取页面的可用高度和导航栏高度
    this.setData({
      statusBarHeight: app.globalData.statusBarHeight,
      currentpageheight: app.globalData.currentpageheight
    })
    // 监听数据的逻辑
    useplatListstore.onStates(["playListData", "playLiseIndex"], this.handelplaylistdata)
    useplatListstore.onStates(["songId", "palysonginfo", "palysonglyric", "currentLyricText", "currentLyricIndex", "songduartion", "isplay", "currenttitem", "isplay", "playmodeIndex"], this.handelgetplayinfos)
    if(id){
      useplatListstore.dispatch("playsongWidthId", id)
    }
  },
  // 对切换音乐进度进行节流
  updata: throttle(function (currenttitem) {
    if (this.data.isChangeing) return
    // 当你需要切换的时候你把当前的时间给我传递过来,然后我在给你设置一下这样不那么频繁
    this.setData({
      currenttitem: currenttitem
    })
    // 修改滑块的时间
    const sliderValue = currenttitem / this.data.songduartion * 100
    this.setData({
      sliderValue: sliderValue
    })

  }, 1000, {
    leading: false
  }),

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
  onsliderchangeing: throttle(function (event) {
    this.setData({
      isChangeing: true
    })
    // 滑动中不要给我改变音乐 滑动停止了给我改变一下
    // 拿到当前的点击的位置
    const value = event.detail.value
    this.setData({
      currenttitem: value / 100 * this.data.songduartion,
      isChangeing: false,
      sliderValue: value
    })
    // 在他给我滑动的过程中你上面就不要给我设置时间了要不然来回跳
  }, 1000),
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
    useplatListstore.dispatch("playmusicState")
  },
  handelplaylistdata(value) {
    console.log("监听到了数据的获取，准备播放该列表")
    if (value.playListData) {
      this.setData({
        playListData: value.playListData
      })
    }
    if (value.playLiseIndex !== undefined) {
      this.setData({
        playlistIndex: value.playLiseIndex
      })
    }

  },
  handelgetplayinfos({
    songId,
    palysonginfo,
    palysonglyric,
    currentLyricText,
    currentLyricIndex,
    songduartion,
    currenttitem,
    isplay,
    playmodeIndex
  }) {
    // 对数据进行存储
    if (songId !== undefined) {
      this.setData({
        songId
      })
    }
    if (palysonginfo) {
      this.setData({
        palysonginfo
      })
    }
    if (palysonglyric) {
      this.setData({
        palysonglyric
      })
    }
    if (currentLyricText) {
      this.setData({
        currentLyricText
      })
    }
    if (currentLyricIndex !== undefined) {
      this.setData({
        currentLyricIndex
      })
      this.setData({
        lyricScrollTop: 40 * this.data.currentLyricIndex
      })
    }
    if (songduartion !== undefined) {
      this.setData({
        songduartion
      })
    }
    if (currenttitem !== undefined) {
      this.updata(currenttitem)
    }
    if (isplay !== undefined) {
      this.setData({
        isplay
      })
    }
    if (playmodeIndex !== undefined) {
      this.setData({
        playmoundINdex: playmodeIndex
      })
    }
  },
  onprevCLick() {
    this.changenewSong(false)
  },
  onnextCLick() {
    this.changenewSong(true)
  },
  changenewSong(isNext) {
    useplatListstore.dispatch("palymusicnextorprev", isNext)
  },
  playmoundindexCLick() {
    useplatListstore.dispatch("playmusicplaymodeIndex")
  },
  // 点击按钮返回上一级
  onbackclick() {
    wx.navigateBack()
  },
  // 在组件销毁的时候把数据给我干掉
})