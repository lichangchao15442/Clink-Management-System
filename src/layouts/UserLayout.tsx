import React from 'react'
import { ConnectProps, ConnectState } from '@/models/connect'
import { MenuDataItem, getMenuData, getPageTitle } from '@ant-design/pro-layout'
import { connect } from 'dva'
import { formatMessage } from 'umi-plugin-react/locale'
import { Helmet } from 'react-helmet'
import styles from './UserLayout.less'

export interface UserLayoutProps extends ConnectProps {
    breadcrumbNameMap: {
        [path: string]: MenuDataItem
    }
}


const UserLayout: React.FC<UserLayoutProps> = props => {
    const { route = { routes: [] } } = props
    const { routes = [] } = route
    const { children, location = { pathname: '' } } = props
    const { breadcrumb } = getMenuData(routes)
    const title = getPageTitle({
        pathname: location.pathname,
        formatMessage,
        breadcrumb,
        ...props

    })

    console.log("title", title)
    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name='description' content={title} />
            </Helmet>
            <div className={styles.container}>
                <div className={styles.lang}>lang</div>
                <div className={styles.content}>{children}</div>
            </div>
        </>
    )
}

export default connect(({ settings }: ConnectState) => ({ ...settings }))(UserLayout)