
let CURRENT: string | string[] = 'NULL'

type CurrentAuthorityType = string | string[] | (() => typeof CURRENT)

// renderAuthorize方法的返回值为一个函数，返回值为Authorized
const renderAuthorize = <T>(Authorized: T): ((currentAuthority: CurrentAuthorityType) => T) => (
    currentAuthority: CurrentAuthorityType,
): T => {
    if (currentAuthority) {
        if (typeof currentAuthority === 'function') {
            CURRENT = currentAuthority()
        }
        if (Object.prototype.toString.call(currentAuthority) === '[Object String]' ||
            Array.isArray(currentAuthority)
        ) {
            CURRENT = currentAuthority as string[]
        }
    } else {
        CURRENT = 'NULL'
    }
    return Authorized
}

export { CURRENT }
export default <T>(Authorized: T) => renderAuthorize<T>(Authorized)