// components/songsItem/index.js

import {
  Songscollection
} from '../../dataBase/index'
import {
  useSongsStore
} from '../../stores/songs'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    Itemdata: {
      type: Object,
      value: {}
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
    async ondeleteClick() {
      const res = await Songscollection.remove(this.properties.Itemdata._id)
      if (res) {
        wx.showToast({
          title: '删除成功',
        })
        useSongsStore.dispatch("fetchMenulistAction")
      }
    }
  }
})