import {
  object
} from "underscore";

// components/houtlistItem/houtlistitem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemData: {
      type: object,
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
    onsonglistitemclick() {
      const itemID = this.properties.itemData.id
      wx.navigateTo({
        url: `/pages/morepage/morepage?pagetype=songitem&pageID=${itemID}`,
      })
    }
  }
})