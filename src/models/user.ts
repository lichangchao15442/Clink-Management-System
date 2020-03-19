import { Effect } from 'dva'
import { queryCurrent, changeProfile } from '@/services/user'
import { Reducer } from 'redux'
import { message } from 'antd'
import { formatMessage } from 'umi-plugin-react/locale'

export interface currentUser {
    mobile?: string;
    password?: string;
    authority?: string;
    name?: string;
    avatar?: string;
    employeeId?: string;
    age?: string;
    gender?: string;
    email?: string;
    idNumber?: string;
    job?: string;
    address?: string;
    addressDetail?: string;
    department?: string;
    role?: string;
}


export interface UserModelState {
    currentUser: currentUser
}

export interface UserModelType {
    namespace: 'user';
    state: UserModelState;
    effects: {
        fetchCurrent: Effect;
        changeProfile: Effect
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
        *fetchCurrent({ payload }, { call, put }) {
            const response = yield call(queryCurrent, payload)
            yield put({
                type: 'saveCurrentUser',
                payload: response
            })
        },
        *changeProfile({ payload }, { call, put }) {
            const response = yield call(changeProfile, { ...payload, id: localStorage.getItem('id') })
            if (response.status === 'ok') {
                message.success(formatMessage({ id: 'save.success' }))
                // 用户信息改变，头部的个人信息显示也要改变
                yield put({
                    type: 'saveCurrentUser',
                    payload: response.data
                })

            }
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