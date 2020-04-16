import { reloadAuthorized } from './Authorized'



export function getAuthority(str?: string): string | string[] {
    let clinicAuthority
    if (localStorage.getItem('clinic-authority')) {
        const val = localStorage.getItem('clinic-authority')
        const valObj = val && JSON.parse(val)
        if (Date.now() - valObj.time > valObj.expire) {
            localStorage.removeItem('clinic-authority')
        } else {
            clinicAuthority = valObj.data
        }
    }
    const authorityString =
        typeof str === 'undefined' && clinicAuthority ? clinicAuthority : str
    // authorityString 可能是以下类型：admin,'admin',['admin']
    let authority
    try {
        if (authorityString) {
            authority = JSON.parse(authorityString)
        }
    } catch (e) {
        authority = authorityString
    }
    if (typeof authority === 'string') {
        return [authority]
    }
    return authority
}


export function setAuthority(authority: string | string[]): void {
    const clinicAuthority = typeof authority === 'string' ? [authority] : authority
    // 设置登录有效期
    const obj = {
        data: clinicAuthority,
        time: Date.now(),
        expire: 2629800000
    }
    localStorage.setItem('clinic-authority', JSON.stringify(obj))
    // 自动重新加载
    reloadAuthorized()
}

