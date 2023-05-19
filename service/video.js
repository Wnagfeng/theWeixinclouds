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