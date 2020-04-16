import { Reducer } from 'redux'

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
        collapsed: false,
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