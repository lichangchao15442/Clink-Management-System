import { AnyAction } from 'redux'
import { EffectsCommandMap, Subscription } from 'dva'

import { prescriptionTypes } from '@/utils/dataDictionary'
import { newlyOpenedStateType } from './data'

type Effects = (
    action: AnyAction,
    effects: EffectsCommandMap
) => void

interface ModalType {
    namespace: string;
    state: newlyOpenedStateType;
    effects: {};
    reducers: {};
    subscriptions: {
        setup: Subscription
    }
}

const Model: ModalType = {
    namespace: 'newlyOpened',

    state: {},

    effects: {},

    reducers: {},

    subscriptions: {
        setup({ history, dispatch }) {
            history.listen(({ pathname }) => {
                if (pathname === '/newly-opened') {
                    dispatch({
                        type: 'patients/fetchPatients'
                    })
                    dispatch({
                        type: 'drugs/fetch',
                        payload: {
                            prescriptionType: prescriptionTypes[0].key
                        }
                    })
                }
            })
        }
    }
}


export default Model