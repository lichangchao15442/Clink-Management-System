import { AnyAction, Reducer } from 'redux'
import { EffectsCommandMap } from 'dva'

import { queryPatients } from '@/pages/patient-management/service'
import { patientManagementState } from '@/pages/patient-management/data'


type Effects = (
    action: AnyAction,
    effects: EffectsCommandMap & { select: <T>(func: (state: any) => T) => T }
) => void



interface ModelType {
    namespace: string;
    state: patientManagementState;
    effects: {
        fetchPatients: Effects;
    };
    reducers: {
        savePatients: Reducer<patientManagementState>
    };
}

const Model: ModelType = {
    namespace: 'patients',

    state: {
        patients: [],
        total: 0
    },

    effects: {
        *fetchPatients({ payload }, { call, put }) {
            const response = yield call(queryPatients, payload)
            yield put({
                type: 'savePatients',
                payload: response
            })
        },
    },

    reducers: {
        savePatients(state, { payload }) {
            return {
                ...state,
                patients: payload.data,
                total: payload.total
            }
        }
    },


}

export default Model