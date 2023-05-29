import {
  get
} from "underscore"

// components/houtlist/houtlist.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemdata: {
      type: Array,
      value: []
    },
    title: {
      type: String,
      value: "默认歌单"
    }


  },

  /**
   * 组件的初始数据
   */
  data: {
    screenWidth: 375
    
  },
  lifetimes: {
    ready() {
      this.setData({
        screenWidth: app.globalData.screenWidth
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onrecommendMoreClick() {
      wx.navigateTo({
        url: '/pages/songListDetalile/songListDetalile',
      })
    }
  }
})