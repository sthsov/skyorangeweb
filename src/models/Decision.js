import { getTradePlans } from '@/services/api'

export default {
  namespace: 'decision',

  state: {
    decisions: []
  },

  reducers: {
    decisions(state, actions) {
      return {
        ...state,
        decisions: actions.payload
      }
    }
  },

  effects: {
    *getDecisions({payload}, {call,put}) {
      const response = yield call(getTradePlans, payload);
      yield put({
        type: 'decisions',
        payload: response
      })
    }
  }
}
