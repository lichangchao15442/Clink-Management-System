
let CURRENT: string | string[] = 'NULL'

type CurrentAuthorityType = string | string[] | (() => typeof CURRENT)

const renderAuthorize = <T>(Authorized: T): ((currentAuthority: CurrentAuthorityType) => T) => (
    currentAuthority: CurrentAuthorityType,
): T => Authorized

export { CURRENT }
export default <T>(Authorized: T) => renderAuthorize<T>(Authorized)