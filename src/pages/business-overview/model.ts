import { fakeData, fakeIncomeTrendData } from './service'
import { StateType } from './data'
import { AnyAction, Reducer } from 'redux'
import { EffectsCommandMap } from 'dva'


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
        *fetch({ payload }, { call, put }) {
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
    }

}

export default Model