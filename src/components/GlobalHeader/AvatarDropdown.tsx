import React from 'react'
import { connect } from 'dva'
import { Avatar, Spin, Menu } from 'antd'
import { router } from 'umi'
import { Dispatch } from 'redux'
import { ClickParam } from 'antd/es/menu'
import { ConnectState } from '@/models/connect'
import { currentUser as currentUserState } from '@/models/user'
import HeaderDropdown from '../HeaderDropdown'
import styles from './index.less'

interface AvatarDropdownProps {
    currentUser?: currentUserState;
    menu?: boolean;
    dispatch: Dispatch;
}

const AvatarDropdown: React.FC<AvatarDropdownProps> = props => {
    const { currentUser, menu, dispatch } = props

    const onMenuClick = (event: ClickParam) => {
        const { key } = event
        if (key === 'logout') {
            // 退出
            dispatch({
                type: 'login/logout'
            })

            return
        }

        router.push(`/account/${key}`)

    }
    const menuHeaderDropdown = (
        <Menu className={styles.menu} onClick={onMenuClick}>
            {menu && (
                <Menu.Item key='profile'>
                    账号资料
                </Menu.Item>
            )}
            {menu && (
                <Menu.Item key='change-password'>
                    修改密码
                </Menu.Item>
            )}
            {menu && (
                <Menu.Item key='logout'>
                    退出系统
                </Menu.Item>
            )}
        </Menu>
    )
    return currentUser && currentUser.name ? (
        <HeaderDropdown overlay={menuHeaderDropdown}>
            <span className={`${styles.action} ${styles.account}`}>
                <Avatar className={styles.avatar} src={currentUser.avatar} alt='avatar' />
                <span className={styles.name}>{currentUser.name}</span>
            </span>
        </HeaderDropdown>
    ) : (
            <span className={`${styles.action} ${styles.account}`}>
                <Spin
                    style={{
                        margin: '0 8px'
                    }}
                />
            </span>
        )
}

export default connect(({ user }: ConnectState) => ({ currentUser: user.currentUser }))(AvatarDropdown)