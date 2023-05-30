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

### 点击进度滑块播放时间就不动了

这个锅可以甩给小程序官方 当我们切换音乐进度以后不在进行监听播放时间

解决方案

```js
 // bug处理 当点击完成以后时间就不在改变了
//  bug原因 他的监听在你改变进度以后就监听不到了 这个就很难受所以我们需要在改变进度以后重新让他监听起来
//  该音乐的播放是需要缓存的 所以当你切换音乐的时候他会进行一个短暂的等待这时候我们把他暂停住 等到缓存成功了在播放出来就行
audioCOntete.onWaiting(() => {
  // 在等待过程中先暂停播放
  audioCOntete.pause()
})
// 等到你可以播放的时候在播放一下
audioCOntete.onCanplay(() => {
  audioCOntete.play()
})
```

### 对代码的逻辑进行抽取 play页面只是负责播放的展示播放的逻辑放到store下面



