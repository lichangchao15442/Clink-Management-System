import { changePassword } from './service'
import { message } from 'antd'
import { formatMessage } from 'umi-plugin-react/locale'
import { AnyAction, Reducer } from 'redux'
import { EffectsCommandMap } from 'dva'

export type Effect = (
    action: AnyAction,
    effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T }
) => void

export interface StateType {
    status: string;
}

interface ModelProps {
    namespace: string;
    state: {};
    effects: {
        submit: Effect
    };
    reducers: {
        changeStatus: Reducer<StateType>
    }
}

const Model: ModelProps = {
    namespace: 'changePassword',
    state: {
        status: ''
    },
    effects: {
        *submit({ payload }, { call, put }) {
            const id = localStorage.getItem('id')
            const response = yield call(changePassword, { ...payload, id })
            yield put({
                type: 'changeStatus',
                payload: response.status
            })
            if (response.status === 'ok') {
                message.success(formatMessage({ id: 'change-password.submit.success' }))
            }
        }
    },
    reducers: {
        changeStatus(state, { payload }) {
            return {
                status: payload
            }
        }
    }
}

export default Model