import {
  HYEventStore
} from 'hy-event-store'
import {
  getplaylist
} from '../service/music'
export const useRankingStore = new HYEventStore({
  state: {
    recommendlist: []
  },
  actions: {
    async fetchgetplaylistData(ctx) {
      const res = await getplaylist(3779629)
      ctx.recommendlist=res.playlist.tracks
    }
  }
})