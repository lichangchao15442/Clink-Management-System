import { AnyAction, Reducer } from 'redux'
import { EffectsCommandMap, Subscription } from 'dva'
import { message } from 'antd'
import { formatMessage } from 'umi-plugin-react/locale'
import { parse } from 'qs'

import { queryPatients, addPatient, deletePatient, updatePatient } from './service'
import { patientManagementState } from './data'


type Effects = (
    action: AnyAction,
    effects: EffectsCommandMap & { select: <T>(func: (state: any) => T) => T }
) => void



interface ModelType {
    namespace: string;
    state: patientManagementState;
    effects: {
        fetchPatients: Effects;
        addPatient: Effects;
        deletePatient: Effects;
        updatePatient: Effects;
    };
    reducers: {
        savePatients: Reducer<patientManagementState>
    };
    subscriptions: {
        setup: Subscription
    }
}

const Model: ModelType = {
    namespace: 'patientManagement',

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
        *addPatient({ payload }, { call }) {
            const response = yield call(addPatient, payload)
            if (response.status === 'ok') {
                message.success(formatMessage({ id: 'patientandmanagement.addPatient.success' }))
            }
        },
        *deletePatient({ payload }, { call }) {
            const response = yield call(deletePatient, payload)
            if (response.status === 'ok') {
                message.success(formatMessage({ id: 'patientandmanagement.deletePatient.success' }))
            }
        },
        *updatePatient({ payload }, { call }) {
            const response = yield call(updatePatient, payload)
            if (response.status === 'ok') {
                message.success(formatMessage({ id: 'commonandfields.setUp.success' }))
            }
        }
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

    subscriptions: {
        setup({ history, dispatch }): void {
            history.listen(({ pathname, search }): void => {
                if (pathname === '/patient-management') {
                    const query = parse(search.split('?')[1])
                    dispatch({
                        type: 'fetchPatients',
                        payload: query
                    })
                }
            })
        }
    }

}

export default Model