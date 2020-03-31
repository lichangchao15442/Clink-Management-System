import { Reducer, AnyAction } from 'redux'
import { EffectsCommandMap, Subscription } from 'dva'
import { StateType } from './data'
import { queryDoctors } from './service'


type Effects = (
    action: AnyAction,
    effects: EffectsCommandMap & { select: <T> (func: (state: any) => T) => T }
) => void

interface ModelType {
    namespace: string;
    state: StateType;
    effects: {
        fetchDoctors: Effects,
    };
    reducers: {
        saveDoctors: Reducer<StateType>;
    };
    subscriptions: {
        setup: Subscription
    }
}

const Model: ModelType = {
    namespace: 'addRegistered',

    state: {
        doctors: [],
    },

    effects: {
        *fetchDoctors(_, { call, put }) {
            const response = yield call(queryDoctors)
            yield put({
                type: 'saveDoctors',
                payload: response.data
            })
        }
    },

    reducers: {
        saveDoctors(state, { payload }): StateType {
            return {
                ...state,
                doctors: payload
            }
        }
    },

    subscriptions: {
        setup({ history, dispatch }) {
            history.listen(({ pathname }) => {
                if (pathname === '/registration-management/add-registered') {
                    dispatch({
                        type: 'fetchDoctors'
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