import { Effect } from 'dva'
import { queryCurrent } from '@/services/user'
import { Reducer } from 'redux'

export interface currentUser {
    avatar?: string;
    name?: string;
    userid?: string;
    // email?: string;
    title?: string;
    signature?: string;
}


export interface UserModelState {
    currentUser?: currentUser
}

export interface UserModelType {
    namespace: 'user';
    state: UserModelState;
    effects: {
        fetchCurrent: Effect
    };
    reducers: {
        saveCurrentUser: Reducer<UserModelState>
    }
}

const UserModel: UserModelType = {
    namespace: 'user',

    state: {
        currentUser: {}
    },

    effects: {
        *fetchCurrent(_, { call, put }) {
            const response = yield call(queryCurrent)
            yield put({
                type: 'saveCurrentUser',
                payload: response
            })
        }
    },

    reducers: {
        saveCurrentUser(state, action) {
            return {
                ...state,
                currentUser: action.payload || {}
            }
        }
    }
}

export default UserModel