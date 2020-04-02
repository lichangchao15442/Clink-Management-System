import { AnyAction, Reducer } from 'redux'
import { EffectsCommandMap } from 'dva'

import { queryDoctors } from '../services/doctors'


export interface DoctorsType {
    id: number;
    name: string;
    gender: number;
    age: number;
    mobile: number;
    affiliatedClinic: number;
    department: number;
    role: number;
    createTime: string;
    createPeople: string;
    employeeStatus: number;
}

export interface DoctorsStateType {
    doctors: DoctorsType[];
}

type Effects = (
    action: AnyAction,
    effects: EffectsCommandMap & { select: <T> (func: (state: DoctorsStateType) => T) => T }
) => void

interface ModelType {
    namespace: string;
    state: DoctorsStateType;
    effects: {
        fetchDoctors: Effects
    };
    reducers: {
        saveDoctors: Reducer<DoctorsStateType>
    }
}

const Model: ModelType = {
    namespace: 'doctors',
    state: {
        doctors: []
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
        saveDoctors(state, { payload }) {
            return {
                ...state,
                doctors: payload
            }
        }
    }

}

export default Model