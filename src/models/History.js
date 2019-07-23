import { getHistoryTrade } from '@/services/api'

export default {
  namespace: 'history',

  state : {
    historyTrades: []
  },

  effects: {
    *getHistoryTrade({payload}, {call, put}) {
      const response = yield call(getHistoryTrade, payload);
      yield put({
        type: 'historyTrades',
        payload: response
      })
    }
  },

  reducers: {
    historyTrades(state, actions) {
      return {
        ...state,
        historyTrades: actions.payload
      }
    }
  }
}
