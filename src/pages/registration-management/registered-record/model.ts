import { AnyAction, Reducer } from 'redux'
import { EffectsCommandMap, Subscription } from 'dva'
import { parse } from 'qs'

import { StateType } from './data'
import { queryRegisteredPatient } from './service'



type Effects = (
    action: AnyAction,
    effects: EffectsCommandMap & { select: <T>(func: (state: any) => T) => T }
) => void

interface ModelType {
    namespace: string;
    state: StateType;
    effects: {
        fetch: Effects
    };
    reducers: {
        save: Reducer<StateType>
    };
    subscriptions: {
        setup: Subscription
    };
}

const Model: ModelType = {
    namespace: 'registeredRecord',
    state: {
        pendingRegisteredPatients: [],
        consultedRegisteredPatients: [],
        bouncedRegisteredPatients: [],
    },
    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(queryRegisteredPatient, payload)
            yield put({
                type: 'save',
                payload: response
            })
        }
    },
    reducers: {
        save(state, { payload }) {
            return {
                ...state,
                ...payload
            }
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname, search }): void => {
                if (pathname === '/registration-management/registered-record') {
                    const query = parse(search.split('?')[1])
                    dispatch({
                        type: 'fetch',
                        payload: query
                    })
                    dispatch({
                        type: 'doctors/fetchDoctors'
                    })
                }
            })
        }
    }
}

export default Model