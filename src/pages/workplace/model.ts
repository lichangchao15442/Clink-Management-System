import { AnyAction, Reducer } from 'redux'
import { EffectsCommandMap } from 'dva'
import { queryOutpatientRecords } from './service'

type Effects = (
    action: AnyAction,
    effects: EffectsCommandMap & { select: <T>(func: (state: ModelState) => T) => T }
) => void

interface ModelType {
    namespace: string;
    state: {};
    effects: {
        fetch: Effects
    }
    reducers: {
        save: Reducer<ModelState>
    }
}

export interface outpatientRecordsType {
    id: number;
    avatar: string;
    patientName: string;
    vipLevel: number;
    gender: number;
    age: number;
    visitStatus: number;
    createTime: string;
    department: number;
    doctorName: string;
    mobile: string;
}

export interface ModelState {
    outpatientRecordsList: outpatientRecordsType[];
    total: number
}

const Model: ModelType = {
    namespace: 'workplace',

    state: {
        outpatientRecordsList: [],
        total: null
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(queryOutpatientRecords, payload)
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
                outpatientRecordsList: payload.data,
                total: payload.total
            }
        }
    }
}

export default Model