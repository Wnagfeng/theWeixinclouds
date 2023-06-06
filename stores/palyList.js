import {
  HYEventStore
} from 'hy-event-store'
import {
  getpalysonginfo,
  getpalysonglyric
} from '../service/play'
import {
  parseLyric
} from '../utils/lyric-parse'
import {historycollection} from '../dataBase/index'
export const audioCOntete = wx.createInnerAudioContext()

export const useplatListstore = new HYEventStore({
  state: {
    playListData: [],
    playLiseIndex: 0,
    songId: -1,
    palysonginfo: {},
    palysonglyric: [],
    currentLyricText: "",
    currentLyricIndex: -1,
    songduartion: 0,
    isplay: false,
    currenttitem: 0,
    playmodeIndex: 0,
    sliderValue: 0
  },
  actions: {
    // 需要播放音乐把id传递过来
    playsongWidthId(ctx, id) {
      ctx.id = id
      ctx.isplay = true
      ctx.currenttitem = 0,
        ctx.songduartion = 0,
        ctx.palysonginfo = {}
      ctx.currentLyricText = "",
        ctx.currentLyricIndex = -1

      // 根据songid获取音乐数据
      getpalysonginfo(id).then((res) => {
        ctx.palysonginfo = res.songs[0],
          ctx.songduartion = res.songs[0].dt
          historycollection.add(ctx.palysonginfo)
      })
      getpalysonglyric(id).then((res) => {
        ctx.palysonglyric = parseLyric(res.lrc.lyric)
      })
      // 播放的逻辑
      audioCOntete.stop() //播放上一首前先停掉当前的播放
      audioCOntete.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
      audioCOntete.autoplay = true


      // 播放歌曲的监听
      // 监听播放的时间
      audioCOntete.onTimeUpdate((res) => {
        // 更新时间
        const palysongCruurenttime = audioCOntete.currentTime
        ctx.currenttitem = palysongCruurenttime * 1000
        // 匹配歌词
        if (!ctx.palysonglyric.length) return
        let index = ctx.palysonglyric.length - 1
        for (let i = 0; i < ctx.palysonglyric.length; i++) {
          const info = ctx.palysonglyric[i]
          if (info.time > audioCOntete.currentTime * 1000) {
            index = i - 1;
            break
          }
        }
        if (index === ctx.currentLyricIndex) return
        ctx.currentLyricIndex = index
        ctx.currentLyricText = ctx.palysonglyric[index].content
        if (audioCOntete.paused) {
          ctx.isplay = false
        } else {
          ctx.isplay = true
        }
      })
      audioCOntete.onWaiting(() => {
        audioCOntete.pause()
      })
      audioCOntete.onCanplay(() => {
        audioCOntete.play()
      })
      audioCOntete.onEnded(() => {
        this.dispatch("palymusicnextorprev")
      })

    },
    playmusicState(ctx) {
      if (!audioCOntete.paused) {
        audioCOntete.pause()
        ctx.isplay = false
      } else {
        audioCOntete.play()
        ctx.isplay = true
      }
    },
    playmusicplaymodeIndex(ctx) {
      let modeIndex = ctx.playmodeIndex
      modeIndex = modeIndex + 1
      if (modeIndex === 3) {
        modeIndex = 0
      }
      ctx.playmodeIndex = modeIndex
    },
    palymusicnextorprev(ctx, isNext = true) {
      const length = ctx.playListData.length
      let index = ctx.playLiseIndex
      switch (ctx.playmodeIndex) {
        case 0:
          index = isNext ? index + 1 : index - 1
          // 边界的判断
          if (index == length) index = 0
          if (index == -1) index = length - 1
          break
        case 1:
          break
        case 2:
          index = Math.floor(Math.random() * length)
          break
      }
      // 更新store
      const currentSong = ctx.playListData[index]
      ctx.playLiseIndex = index
      const currentsongId = currentSong.id
      // 拿到id去播放音乐
      this.dispatch("playsongWidthId", currentsongId)
    }
  }
})