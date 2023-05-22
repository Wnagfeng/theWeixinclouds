// components/area-header/area-header.js
Component({
  /**
   * 组件的属性列表
   */

  methods: {
    onmoreClick() {
      this.triggerEvent("moreCLick")
    },
  },
  properties: {
    title: {
      type: String,
      value: "默认"
    },
    isshowmore: {
      type: Boolean,
      value: true
    }
  },



  /**
   * 组件的初始数据
   */
  data: {

  },


})