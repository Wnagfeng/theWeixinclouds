// components/playList-v1/playlistv1.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemdata: {
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
    onsongitemclick() {
      const id = this.properties.itemdata.id
      wx.navigateTo({
        url: `/pages/songmusicPlay/songmusicplay?id=${id}`,
      })
    }
  }
})