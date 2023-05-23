import {
  WfrequestInstance
} from './index'
export function getBannerList() {
  return WfrequestInstance.get({
    url: "/banner"
  })
}
export function getplaylist(id) {
  return WfrequestInstance.get({
    url: "/playlist/detail",
    data: {
      id: id
    }
  })
}

export function getHoutplaylist(cat = "全部", limit = 6, offset = 0) {
  return WfrequestInstance.get({
    url: "/top/playlist",
    data: {
      cat,
      limit,
      offset
    }
  })
}
export function songListDetaile() {
  return WfrequestInstance.get({
    url: "/playlist/hot"
  })
}