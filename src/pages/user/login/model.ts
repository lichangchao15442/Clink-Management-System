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
                // 将用户的电话号码存在本地作为查询用户信息的关键值
                localStorage.setItem('mobile', payload.mobile)
                // 登录进入上一次退出的页面
                const urlParams = new URL(window.location.href)
                const params = getPageQuery()
                let { redirect } = params as { redirect: string }
                if (redirect) {
                    const redirectUrlParam = new URL(redirect)
                    // 如果同源（协议、域名、端口号相同）
                    if (redirectUrlParam.origin === urlParams.origin) {
                        redirect = redirect.substr(urlParams.origin.length)
                        if (redirect.match(/^\/.*#/)) {
                            redirect = redirect.substr(redirect.indexOf('#') + 1)
                        }
                    } else {
                        window.location.href = redirect
                        return;
                    }
                }
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