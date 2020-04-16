import { AnyAction } from 'redux'
import { message } from 'antd'
import { formatMessage } from 'umi-plugin-react/locale'
import { EffectsCommandMap, Subscription } from 'dva'
// import { StateType } from './data'
import { addRegistered } from './service'


type Effects = (
    action: AnyAction,
    effects: EffectsCommandMap & { select: <T> (func: (state: any) => T) => T }
) => void

interface ModelType {
    namespace: string;
    state: {};
    effects: {
        add: Effects,
    };
    // reducers: {
    //     saveDoctors: Reducer<StateType>;
    // };
    subscriptions: {
        setup: Subscription
    }
}

const Model: ModelType = {
    namespace: 'addRegistered',

    state: {
    },

    effects: {
        *add({ payload }, { call }) {
            const response = yield call(addRegistered, payload)
            if (response.status === 'ok') {
                message.success(formatMessage({ id: 'registrationandmanagement.registeredandrecord.chargedSuccessfully' }))
            }
        }
    },

    subscriptions: {
        setup({ history, dispatch }) {
            history.listen(({ pathname }) => {
                if (pathname === '/registration-management/add-registered') {
                    dispatch({
                        type: 'doctors/fetchDoctors'
                    })
                    dispatch({
                        type: 'patients/fetchPatients'
                    })
                }
            })
        }
    }
}


export default Model