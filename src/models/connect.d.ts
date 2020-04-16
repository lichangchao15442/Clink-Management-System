
import { GlobalModelState } from './global'
import { DefaultSettings as SettingModelState } from '../../config/defaultSettings'
import { RouterTypes } from 'umi'
import { Dispatch } from 'react'
import { MenuDataItem } from '@ant-design/pro-layout'
import { AnyAction } from 'redux'
import { UserModelState } from './user'

export { UserModelState }

export interface Loading {
    global: boolean;
    effects: { [key: string]: boolean | undefined };
    models: {
        global?: boolean;
        menu?: boolean;
        setting?: boolean;
        user?: boolean;
        login?: boolean;
    }
}

export interface ConnectState {
    global: GlobalModelState;
    loading: Loading;
    settings: SettingModelState;
    user: UserModelState
}

export interface Route extends MenuDataItem {
    routes?: Route[]
}

export interface ConnectProps<T = {}> extends Partial<RouterTypes<Route, T>> {
    dispatch?: Dispatch<AnyAction>
}