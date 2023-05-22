import {
  WfrequestInstance
} from './index'
export function getBannerList() {
  return WfrequestInstance.get({
    url:"/banner"
  })
}