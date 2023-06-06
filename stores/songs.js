import {
  HYEventStore
} from 'hy-event-store'
import {
  Songscollection
} from '../dataBase/index'
export const useSongsStore = new HYEventStore({
  state: {
    songlist: []
  },
  actions: {
   async fetchMenulistAction(ctx) {
      const res = await Songscollection.query()
      ctx.songlist=res.data
    }
  }
})
useSongsStore.dispatch("fetchMenulistAction")