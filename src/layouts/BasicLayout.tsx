import React, { useEffect } from 'react'
import { BasicLayoutProps as ProLayoutProps, MenuDataItem, Settings } from '@ant-design/pro-layout'
import { Dispatch } from 'redux'
import { connect } from 'dva'
import { ConnectState } from '@/models/connect'

export interface BasicLayoutProps extends ProLayoutProps {
    breadcrumbNameMap: {
        [path: string]: MenuDataItem
    }
    route: ProLayoutProps['route'] & {
        authority: string[]
    }
    settings: Settings
    dispatch: Dispatch
}

const BasicLayout: React.FC<BasicLayoutProps> = props => {
    console.log(props)
    const {
        children,
        location = { pathname: '/' },
        settings,
        dispatch
    } = props

    useEffect(() => {
        if (dispatch) {
            dispatch({
                type: 'user/fetchCurrent'
            })
        }
    }, [])
    return <>22222</>
}

export default connect(({ global, settings }: ConnectState) => ({
    collapsed: global.collapsed, settings
}))(BasicLayout)