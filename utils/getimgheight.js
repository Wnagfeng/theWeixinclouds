export function getimgheigt(seloct) {
  return new Promise((resolve) => {
    const query = wx.createSelectorQuery()
    query.select(seloct).boundingClientRect()
    query.exec((res) => {
      resolve(res)
    })
  })
}