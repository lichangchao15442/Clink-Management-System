import { AnyAction, Reducer } from 'redux'
import { EffectsCommandMap, Subscription } from 'dva'
import { fakeData, fakeIncomeTrendData } from './service'
import { StateType } from './data'


export type Effect = (
    action: AnyAction,
    effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T }
) => void

interface ModelType {
    namespace: string;
    state: StateType;
    effects: {
        fetch: Effect;
        fetchIncomeTrend: Effect;
    };
    reducers: {
        save: Reducer<StateType>
    };
    subscriptions: {
        setup: Subscription
    }
}

const Model: ModelType = {
    namespace: 'businessOverview',

    state: {
        introduceData: [],
        incomeTrendWeek: [],
        incomeTrendMonth: [],
        memberSpendingData: [],
        outpatientRecordsData: []
    },

    effects: {
        *fetch(_, { call, put }) {
            const response = yield call(fakeData)
            yield put({
                type: 'save',
                payload: response
            })
        },
        *fetchIncomeTrend({ payload }, { call, put }) {
            const response = yield call(fakeIncomeTrendData, payload)
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
        setup({ history, dispatch }): void {
            history.listen(({ pathname }): void => {
                if (pathname === '/business-overview') {
                    dispatch({
                        type: 'fetch'
                    })
                }
            })
        }
    }

}

export default Model