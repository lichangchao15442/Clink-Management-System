import React, { useEffect } from 'react'
import ProLayout, {
    BasicLayoutProps as ProLayoutProps,
    MenuDataItem,
    Settings,
    DefaultFooter
} from '@ant-design/pro-layout'
import { Dispatch } from 'redux'
import { connect } from 'dva'
import { formatMessage } from 'umi-plugin-react/locale'
import { Link } from 'umi'
import { Result, Button } from 'antd'
import { ConnectState } from '@/models/connect'
import Authorized from '@/utils/Authorized'
import RightContent from '@/components/GlobalHeader/RightContent'
import { getAuthorityFromRouter } from '@/utils/utils'
import logo from '../assets/u145.png'
import styles from './BasicLayout.less'

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

const noMatch = (
    <Result
        status='403'
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
            <Button type="primary">
                <Link to="/user/login">Go Login</Link>
            </Button>
        }
    />
);

const BasicLayout: React.FC<BasicLayoutProps> = props => {
    const {
        children,
        location = { pathname: '/' },
        settings,
        dispatch
    } = props

    useEffect(() => {
        if (dispatch) {
            dispatch({
                type: 'user/fetchCurrent',
                payload: localStorage.getItem('id')
            })
        }
    }, [])

    // 每个菜单路由都需经过权限校验
    const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] => (
        menuList.map(item => {
            const localItem = { ...item, children: item.children ? menuDataRender(item.children) : null }
            return Authorized.check(item.authority, localItem, null) as MenuDataItem
        })
    )

    const footerRender: BasicLayoutProps['footerRender'] = () => {
        return (
            <DefaultFooter copyright='2020 by小呆逼的听众盆友' links={false} />
        )
    }

    const handleMenuCollapse = (payload: boolean): void => {
        if (dispatch) {
            dispatch({
                type: 'global/changeLayoutCollapsed',
                payload
            })
        }
    }

    const authorized = getAuthorityFromRouter(props.route.routes, location.pathname || '/') || {
        authority: undefined
    }

    return (
        <>
            <ProLayout
                logo={logo}
                formatMessage={formatMessage}
                onCollapse={handleMenuCollapse}
                menuHeaderRender={(logoDom, titleDom) => {
                    return (
                        <Link to='/'>
                            <div className={styles.header}>
                                <div className={styles.logo}>{logoDom}</div>
                                <div>{titleDom}</div>
                            </div>
                        </Link>
                    )
                }}
                menuDataRender={menuDataRender}
                menuItemRender={(menuItemProps, defaultDom) => {
                    if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
                        return defaultDom
                    }
                    return <Link to={menuItemProps.path}>{defaultDom}</Link>
                }}
                footerRender={footerRender}
                rightContentRender={() => <RightContent />}
                breadcrumbRender={(routes = []) => [
                    {
                        path: '/',
                        breadcrumbName: formatMessage({ id: 'breadcrumb.home' })
                    },
                    ...routes
                ]}
                itemRender={(route, params, routes, paths) => {
                    const first = routes.indexOf(route) === 0
                    return first ? (
                        <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
                    ) : (
                            <span>{route.breadcrumbName}</span>
                        )
                }}
                {...settings}
                {...props}
            >
                <Authorized authority={authorized!.authority} noMatch={noMatch}>
                    {children}
                </Authorized>
            </ProLayout>
        </>)
}

export default connect(({ global, settings }: ConnectState) => ({
    collapsed: global.collapsed, settings
}))(BasicLayout)