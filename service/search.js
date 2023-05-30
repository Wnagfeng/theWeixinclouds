import {
  WfrequestInstance
} from '../service/index'
export function getsearchData(keywords) {
  return WfrequestInstance.get({
    url: "/cloudsearch",
    data: {
      keywords: keywords
    }
  })
}