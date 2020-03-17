import { AnyAction, Reducer } from 'redux'
import { EffectsCommandMap } from 'dva'
import { message } from 'antd'
import { routerRedux } from 'dva/router'

import { fakeAccountLogin } from './service'
import { setAuthority } from '@/utils/authority'
import { getPageQuery } from '@/utils/utils'

export interface StateType {
    status?: 'ok' | 'error';
    type?: string;
    currentAuthority?: 'user' | 'guest' | 'admin';
}

export type Effect = (
    action: AnyAction,
    effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T }
) => void

export interface ModelType {
    namespace: string;
    state: StateType;
    effects: {
        login: Effect
    },
    reducers: {
        changeLoginStatus: Reducer<StateType>
    }
}

const Model: ModelType = {
    namespace: 'userAndlogin',

    state: {

    },

    effects: {
        *login({ payload }, { call, put }) {
            const response = yield call(fakeAccountLogin, payload)
            yield put({
                type: 'changeLoginStatus',
                payload: response
            })
            // 登录成功
            if (response.status === 'ok') {
                message.success('登录成功！')
                const urlParams = new URL(window.location.href)
                const params = getPageQuery()
                let { redirect } = params as { redirect: string }
                if (redirect) {
                    alert('redirect-重定向')
                }
                // console.log("urlParams", urlParams)
                // 跳转路由
                yield put(routerRedux.replace(redirect || '/business-overview'))
            }
        }
    },

    reducers: {
        changeLoginStatus(state, { payload }) {
            setAuthority(payload.currentAuthority)
            return {
                ...state,
                status: payload.status,
            }
        }
    }
}

export default Model