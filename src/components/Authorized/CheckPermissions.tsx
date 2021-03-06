import { Redirect } from 'umi'
import React from 'react'
import { message } from 'antd'
import { formatMessage } from 'umi-plugin-react/locale'
import { CURRENT } from './renderAuthorize'

export type IAuthorityType =
    | undefined
    | string
    | string[]
    | Promise<boolean>
    | ((currentAuthority: string | string[]) => IAuthorityType)

/**
 * 通用权限检查方法
 * @param {权限限定} authority
 * @param {你的权限} currentAuthority
 * @param {通过的组件} target
 * @param {未通过的组件} Exception
 */
const checkPermissions = <T, K>(
    authority: IAuthorityType,
    currentAuthority: string | string[],
    target: T,
    Exception: K
): T | K | React.ReactNode => {
    // 如果没有登录，则跳转至登录页面（场景：已登录但是清空cookie或cookie失效）
    if (!localStorage.getItem('id')) {
        message.error(formatMessage({id:'login.invalid'}))
        return <Redirect to='/user/login' />
    }
    // 没有判定权限，默认查看所有
    if (!authority) {
        return target
    }

    // 数组处理
    if (Array.isArray(authority)) {
        // console.log("check-currentAuthority",currentAuthority)
        if (Array.isArray(currentAuthority)) {
            if (currentAuthority.some(item => authority.includes(item))) {
                return target
            }
        } else if (authority.includes(currentAuthority)) {
            return target
        }
        return Exception
    }

    // string处理
    if (typeof authority === 'string') {
        if (Array.isArray(currentAuthority)) {
            if (currentAuthority.some(item => authority === item)) {
                return target
            }
        } else if (authority === currentAuthority) {
            return target
        }
        return Exception
    }

    // Promise 处理
    if (authority instanceof Promise) {
        return 'Promise处理'
    }

    // Function处理
    if (typeof authority === 'function') {
        return 'Function处理'
    }

    return target
}

export { checkPermissions }

function check<T, K>(authority: IAuthorityType, target: T, Exception: K): T | K | React.ReactNode {
    return checkPermissions<T, K>(authority, CURRENT, target, Exception)
}

export default check