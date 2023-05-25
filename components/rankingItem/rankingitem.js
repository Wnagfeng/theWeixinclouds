import {
  object
} from "underscore";

// components/rankingItem/rankingitem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemData: {
      type: object,
      value: {}
    },
    keys: {
      type: String,
      value: "newRanking"
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
    onRankingItemTab() {
      const pagetype = this.properties.keys
      const pageID = this.properties.itemData.id
      //在跳转页面的时候把id和key携带过去方便判断用户需要哪段数据
      wx.navigateTo({
        url: `/pages/morepage/morepage?pagetype=${pagetype}&pageID=ranking`,
      })
    }
  }
})