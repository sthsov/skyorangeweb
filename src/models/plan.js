import { getTradePlans } from '@/services/api'

export default {
  namespace: 'plan',

  state: {
    plans: []
  },

  reducers: {
    plans(state, actions) {
      return {
        ...state,
        plans: actions.payload
      }
    }
  },

  effects: {
    *getPlans({payload}, {call,put}) {
      const response = yield call(getTradePlans, payload);
      yield put({
        type: 'plans',
        payload: response
      })
    }
  }
}
