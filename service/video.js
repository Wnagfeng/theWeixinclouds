
import {
  WfrequestInstance
} from './index'

export function getTopmv(limit = 20, offset = 0) {
  return WfrequestInstance.get({
    url: "/top/mv",
    data: {
      limit: limit,
      offset: offset
    }
  })
}

export function getMvurl(id) {
  return WfrequestInstance.get({
    url: "/mv/url",
    data: {
      id
    }
  })
}

export function getMvInfo(mvid) {
  return WfrequestInstance.get({
    url: "/mv/detail",
    data: {
      mvid
    }
  })
}

export function getRelatedMv(id) {
  return WfrequestInstance.get({
    url: "/related/allvideo",
    data: {
      id
    }
  })
}