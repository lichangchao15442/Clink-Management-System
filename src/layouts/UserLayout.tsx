import React from 'react'
import { ConnectProps, ConnectState } from '@/models/connect'
import { MenuDataItem, getMenuData, getPageTitle } from '@ant-design/pro-layout'
import { connect } from 'dva'
import { formatMessage } from 'umi-plugin-react/locale'
import { Helmet } from 'react-helmet'
import SelectLang from '@/components/SelectLang'
import styles from './UserLayout.less'
import logo from "../assets/u145.png"

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

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name='description' content={title} />
            </Helmet>
            <div className={styles.container}>
                <div className={styles.icons}>
                    <span className={styles.heartIcon}>
                        <img src={logo} alt='heart' />
                    </span>
                    <SelectLang />
                </div>
                <div className={styles.content}>{children}</div>
            </div>
        </>
    )
}

export default connect(({ settings }: ConnectState) => ({ ...settings }))(UserLayout)