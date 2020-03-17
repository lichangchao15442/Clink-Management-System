import { AnyAction, Reducer } from 'redux'
import { EffectsCommandMap } from 'dva'
import { routerRedux } from 'dva/router'
import { message } from 'antd'
import { resetPassword } from './service'
import { setAuthority } from '@/utils/authority'


export type Effect = (
    action: AnyAction,
    effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T }
) => void

export interface StateType {
    status?: 'ok' | 'error';
    currentAuthority?: 'user' | 'admin' | 'guest'
}

export interface ModelProps {
    namespace: string;
    state: StateType;
    effects: {
        submit: Effect
    };
    reducers: {
        changeResetStatus: Reducer<StateType>
    }
}

const Model: ModelProps = {

    namespace: 'resetPassword',

    state: {},

    effects: {
        *submit({ payload }, { call, put }) {
            const response = yield call(resetPassword, payload)
            yield put({
                type: 'changeResetStatus',
                payload: response
            })
            if (response.status === 'ok') {
                message.success('设置密码成功')
                yield put(routerRedux.replace('/business-overview'))
            }
        }
    },

    reducers: {
        changeResetStatus(state, { payload }) {
            setAuthority(payload.currentAuthority)
            return {
                ...state,
                status: payload.status
            }
        }
    }

}

export default Model