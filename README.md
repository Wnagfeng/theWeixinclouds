### 往抑云

### 解决轮播图翻页指示器不在轮播图上面的方案

在写轮播图的时候发现轮播图组件和图片的高度不一致就是多了一个控制器的原因 在这里只要把轮播图组件的高度设置和图片的高度一致就行，由于在不同的设备上图片的高度不一致 所以需要动态的获取到图片的高度进行动态的设置上去高度

需要使用api进行获取

```js
export function getimgheigt(seloct) {
  return new Promise((resolve) => {
    const query = wx.createSelectorQuery()
    query.select(seloct).boundingClientRect()
    query.exec((res) => {
      resolve(res)
    })
  })
}
```

小程序组件间数据共享的方式这里采用 hy-event-store第三方库进行数据共享