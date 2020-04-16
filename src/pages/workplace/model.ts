import { AnyAction, Reducer } from 'redux'
import { EffectsCommandMap, Subscription } from 'dva'
import { parse } from 'qs'
import { queryOutpatientRecords } from './service'
import { ModelState } from './data'

type Effects = (
    action: AnyAction,
    effects: EffectsCommandMap & { select: <T>(func: (state: ModelState) => T) => T }
) => void

interface ModelType {
    namespace: string;
    state: {};
    effects: {
        fetch: Effects
    };
    reducers: {
        save: Reducer<ModelState>
    };
    subscriptions: {
        setup: Subscription
    }

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
    },

    subscriptions: {
        setup({ history, dispatch }): void {
            history.listen(({ pathname, search}): void => {
                if (pathname === '/workplace') {
                    const query = parse(search.split('?')[1])
                    dispatch({
                        type: 'fetch',
                        payload: query
                    })
                }
            })
        }
    }
}

export default Model