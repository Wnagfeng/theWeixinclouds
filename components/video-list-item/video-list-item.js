// components/video-list-item/video-list-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemData: {
      type: Object,
      value: {}
    }

  },
 methods:{
  itemclick(){
    // 点击按钮以后拿到当前点击的item的id传递过去
    const item =this.properties.itemData
    wx.navigateTo({
      url: `/pages/video-detile/videoDetail?id=${item.id}`,
    })
  }
 }
})