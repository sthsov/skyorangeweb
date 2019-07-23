import { getTradeItems, getOpeningTrade, getClosedTrade } from '@/services/api'

export default {
  namespace: 'trade',

  state: {
    tradeItems: []
  },

  effects: {
    *getTradeItems({ payload } , { call, put }) {
      const response = yield call(getTradeItems, payload);
      yield put({
        type: 'tradeItems',
        payload: response
      })
    },

    *getOpeningTrade({ payload } , { call, put }) {
      const response = yield call(getOpeningTrade, payload);
      yield put({
        type: 'openingTrade',
        payload: response
      })
    },

    *getClosedTrade({ payload } , { call, put }) {
      const response = yield call(getClosedTrade, payload);
      yield put({
        type: 'closedTrade',
        payload: response
      })
    },
  },

  reducers: {
    tradeItems(state, actions) {
      return {
        ...state,
        tradeItems: actions.payload
      }
    },
    openingTrade(state, actions) {
      return {
        ...state,
        openingTrade: actions.payload
      }
    },
    closedTrade(state, actions) {
      return {
        ...state,
        closedTrade: actions.payload
      }
    }
  }
}
