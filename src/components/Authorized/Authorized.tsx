import React from 'react'
import { Result } from 'antd';
import check, { IAuthorityType } from './CheckPermissions'

interface AuthorizedProps {
    authority: IAuthorityType;
    noMatch?: React.ReactNode;
}

type IAuthorizedType = React.FunctionComponent<AuthorizedProps> & {
    // Secured: typeof 
    check: typeof check
}

const Authorized: React.FunctionComponent<AuthorizedProps> = ({
    children,
    authority,
    noMatch = (
        <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
        />
    )
}) => {
    // console.log('Authorized', children, authority)
    const childrenRender = typeof children === 'undefined' ? null : children
    const dom = check(authority, childrenRender, noMatch)
    // console.log('dom', dom)
    return <>{dom}</>
}

export default Authorized as IAuthorizedType