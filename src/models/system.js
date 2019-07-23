import {  getMoneyDetails, getUserList } from '@/services/api'

export default {
  namespace: 'system',

  state: {
    details: [],
    userList: []
  },

  reducers: {
    details(state, { payload }) {
      return {
        ...state,
        details: payload
      }
    },
    user(state, {payload}) {
      return {
        ...state,
        userList: payload
      }
    }
  },

  effects: {
    *getDetails({payload}, { call, put }) {
      const response = yield call(getMoneyDetails, payload);
      yield put({
        type: 'details',
        payload: response
      })
    },
    *getUserList({payload}, {call, put}) {
      const response = yield call(getUserList, payload);
      yield put({
        type: 'user',
        payload: response
      })
    }
  }

}
