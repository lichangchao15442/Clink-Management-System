import { Reducer } from 'redux'
import { Effect } from 'dva'

export interface GlobalModelState {
    collapsed: boolean;
}

interface GlobalModelProps {
    namespace: string;
    state: GlobalModelState;
    // effects: Effect;
    reducers: {
        changeLayoutCollapsed: Reducer<GlobalModelState>
    }
}

const GlobalModel: GlobalModelProps = {
    namespace: 'global',

    state: {
        collapsed: true,
    },

    // effects: {},

    reducers: {
        changeLayoutCollapsed(state, { payload }): GlobalModelState {
            return {
                ...state,
                collapsed: payload
            }
        }
    },

    // subscriptions: {}
}

export default GlobalModel