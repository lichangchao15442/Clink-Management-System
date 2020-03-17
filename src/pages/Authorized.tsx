import React from 'react'
import Authorized from '@/utils/Authorized'
import { ConnectProps, UserModelState, ConnectState } from '@/models/connect'
import { connect } from 'dva'
import { Redirect } from 'umi'
import { getRouteAuthority } from '@/utils/utils'

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
    console.log("isLogin", isLogin,getRouteAuthority(location.pathname, routes))
    return (
        <Authorized
            authority={getRouteAuthority(location.pathname, routes) || ''}
            noMatch={isLogin ? <Redirect to='/exception/403' /> : <Redirect to='/user/login' />}
        >
            {children}
        </Authorized>
    )
}


export default connect(({ user }: ConnectState) => ({ user }))(AuthComponent)
