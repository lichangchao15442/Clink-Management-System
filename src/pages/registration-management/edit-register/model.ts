import { Subscription, EffectsCommandMap } from 'dva'
import { parse } from 'qs'
import { AnyAction, Reducer } from 'redux'
import { message } from 'antd'
import { formatMessage } from 'umi-plugin-react/locale'
import { queryRegisterList, updateRegister } from './service'
import { EditRegisterStateType } from './data'

type Effect = (
    action: AnyAction,
    effects: EffectsCommandMap
) => void

interface ModelType {
    namespace: string;
    state: EditRegisterStateType;
    effects: {
        fetch: Effect,
        submit: Effect
    };
    reducers: {
        save: Reducer<EditRegisterStateType>
    };
    subscriptions: {
        setup: Subscription
    }
}


const Model: ModelType = {
    namespace: 'editRegister',
    state: {
        registeredInformation: {}
    },
    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(queryRegisterList, payload)
            yield put({
                type: 'save',
                payload: response.data
            })
        },
        *submit({ payload }, { call }) {
            const response = yield call(updateRegister, payload)
            if (response.status === 'ok' && response.type === 'edit') {
                message.success(formatMessage({ id: 'registrationandmanagement.editandregister.editRegisteredInformation.success' }))
            } else if(response.status === 'ok' && response.type === 'resign') {
                message.success(formatMessage({ id: 'registrationandmanagement.editandregister.resign.success' }))
            }
        }
    },
    reducers: {
        save(state, { payload }) {
            return {
                ...state,
                registeredInformation: payload
            }
        }
    },
    subscriptions: {
        setup({ history, dispatch }) {
            history.listen(({ pathname, search }) => {
                if (pathname === '/registration-management/edit-register') {
                    const query = parse(search.split('?')[1])
                    dispatch({
                        type: 'fetch',
                        payload: query
                    })
                    dispatch({
                        type: 'doctors/fetchDoctors'
                    })
                    dispatch({
                        type: 'patients/fetchPatients'
                    })
                }
            })
        }
    }
}

export default Model