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
    // 没有判定权限，默认查看所有
    if (!authority) {
        return '没有判定权限'
    }

    // 数组处理
    if (Array.isArray(authority)) {
        return '数组处理'
    }

    // string处理
    if (typeof authority === 'string') {
        console.log("authority", authority)
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