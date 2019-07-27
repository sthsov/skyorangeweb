import { routerRedux } from 'dva/router'
import { stringify } from 'qs';
import { accountLogin } from '@/services/api'
import { setAuthority } from '@/utils/authority'
import { reloadAuthorized } from '@/utils/Authorized';
import { getPageQuery } from '@/utils/utils';

export default {
  namespace: 'login',

  state : {
    status: undefined,
  },

  // 同步更新
  reducers: {
    changeLoginStatus(state, {payload}) {
      // 设置权限
      setAuthority(payload.currentAuthority, payload.username)
      return {
        ...state,
        status: payload.status,
        type: payload.type
      }
    }
  },

  // 异步更新
  effects: {
    // payload为传递的参数
    *login({payload}, {call, put}) {
      const response = yield call(accountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response
      })
      // 成功登录
      if (response.status === 'ok') {
        reloadAuthorized();
        if (response.currentAuthority === 'investor') {
          yield put(routerRedux.replace('/investor/info'));
        } else if(response.currentAuthority === 'admin') {
          yield put(routerRedux.replace('/system/money-situation'))
        } else {
          yield put(routerRedux.replace('/'))
        }
      }
    },
    // 注销操作
    *logout(_, {put}) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest'
        },
      });
      reloadAuthorized();
      // 重定向至登录页面
      if (window.location.pathname !== '/user/login') {
        yield put(
          routerRedux.replace({
            pathname: '/user/login'
          })
        )
      }
    }
  }
}
