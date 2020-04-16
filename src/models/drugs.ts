import { Effect } from 'dva'
import { Reducer } from 'redux'

import { queryDrugs } from '../services/drugs'

export interface DrugsModelState {
    drugs: A<O>
}

interface DrugsModelType {
    namespace: string;
    state: DrugsModelState;
    effects: {
        fetch: Effect
    };
    reducers: {
        save: Reducer
    }

}

const Model: DrugsModelType = {
    namespace: 'drugs',

    state: {
        drugs: []
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(queryDrugs, payload)
            yield put({
                type: 'save',
                payload: {
                    drugs: response.data
                }
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