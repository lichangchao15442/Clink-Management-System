import React from 'react'
import Authorized from '@/utils/Authorized'
import { ConnectProps, UserModelState, ConnectState } from '@/models/connect'
import { connect } from 'dva'
import { Redirect } from 'umi'

interface AuthComponentProps extends ConnectProps {
    user: UserModelState
}

const AuthComponent: React.FC<AuthComponentProps> = ({
    children,
    route = {
        routes: []
    },
    location = {
        pathname: ''
    },
    user
}) => {
    const { currentUser } = user
    const { routes = [] } = route
    const isLogin = currentUser && currentUser.name
    return (
        // <div>AuthComponent{children}</div>
        <Authorized
            authority="undefined"
            noMatch={isLogin ? <Redirect to='/exception/403' /> : <Redirect to='/user/login' />}
        >
            {children}
        </Authorized>
    )
}


export default connect(({ user }: ConnectState) => ({ user }))(AuthComponent)
