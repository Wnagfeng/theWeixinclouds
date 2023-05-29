import {
  HYEventStore
} from 'hy-event-store'
export const useplatListstore = new HYEventStore({
  state: {
    playListData: [],
    playLiseIndex: 0
  }
})