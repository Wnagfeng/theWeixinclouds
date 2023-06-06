import {
  favorcollection,
  likecollection
} from '../../dataBase/index'
import {
  Songscollection,
  db
} from '../../dataBase/index'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemData: {
      type: Object,
      value: {}
    },
    index: {
      type: Number,
      value: -1
    },
    songs: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onsongitemlistclick() {
      const id = this.properties.itemData.id
      wx.navigateTo({
        url: `/pages/songmusicPlay/songmusicplay?id=${id}`,
      })
      console.log(this.properties.itemData)
    },
    onMoreTabClick() {
      wx.showActionSheet({
        itemList: ["收藏", "喜欢", "添加到歌单"],
        success: (res) => {
          const index = res.tapIndex
          console.log(res)
          this.handelUserMoreLCick(index)
        }
      })
    },
    // 创建一个函数用户处理用户的点击 并且把数据存数据库
    async handelUserMoreLCick(index) {
      const tabData = this.data.itemData
      let res = null
      switch (index) {
        case 0:
          // 如果点击的是0我们就把当前点击的数据放到数据库中的收藏表中
          res = await favorcollection.add(tabData)
          break
        case 1:
          // 同理
          res = await likecollection.add(tabData)
          break
        case 2:
          const name = this.properties.songs.map((item) => {
            return item.name
          })
          wx.showActionSheet({
            itemList: name,
            success: (res) => {
              const songsIndex = res.tapIndex
              this.handelSongsList(songsIndex)
            }
          })
          return
      }
      if (res) {
        const title = index === 0 ? '收藏' : '喜欢'
        wx.showToast({
          title: title,
        })
      }
    },
    async handelSongsList(songsindex) {
      // 根据传递过来 的id进行获取歌单并且获取到当前的音乐添加到歌单
      const currentSongs = this.properties.songs[songsindex]
      // 获取到当前需要添加的歌曲
      const currentSongslist = this.properties.itemData
      // 调用添加的方法添加音乐
      const cmd=db.command
      
      const res = await Songscollection.update(currentSongs._id, {
        songs: cmd.push(currentSongslist)
      })
      if (res) {
        wx.showToast({
          title: '添加音乐成功',
        })
      }
    }

  }
})