import {
  WfrequestInstance
} from './index'
export function getpalysonginfo(id) {
  return WfrequestInstance.get({
    url: "/song/detail",
    data: {
      ids: id
    }
  })
}

export function getpalysonglyric(id) {
  return WfrequestInstance.get({
    url: "/lyric",
    data: {
      id: id
    }
  })
}