// components/songlistItem/songlistItem.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemData: {
      type: Object,
      value: {}
    },

  },

  /**
   * 组件的初始数据
   */
  data: {
    screenWidth: 375
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes: {
    ready() {
      this.setData({
        screenWidth: app.globalData.screenWidth,
      })
    }
  }
})