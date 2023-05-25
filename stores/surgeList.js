import {
  HYEventStore
} from 'hy-event-store'
import {
  getRankinglistData
} from '../service/music'

const rankingmap = {
  newRanking: 3779629,
  orginRanking: 2884035,
  upRanking: 19723756
}

export const usesugerlistStore = new HYEventStore({
  // 妈个比 在store那边把数据放到一起到这边直接使用 就是不行操蛋 2023年5月25日10:24:20 我感觉可能是监听深度问题可能数据没拿到但是在appdata中都能看见而且数据结构都是一样的为啥不给我使用 只能是我菜吧！
  state: {
    // rankinglistdata: {
    newRanking: {},
    orginRanking: {},
    upRanking: {}
    // }
  },
  actions: {
    fetchgetrankinglistdata(ctx) {
      for (const item in rankingmap) {
        getRankinglistData(rankingmap[item]).then((res) => {
          ctx[item] = res.playlist
        })
      }
    }
  }
})