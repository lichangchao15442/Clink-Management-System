import RenderAuthorize from '@/components/Authorized'
import { getAuthority } from './authority'

// eslint-disable-next-line import/no-mutable-exports
let Authorized = RenderAuthorize(getAuthority())

// 重新加载权限可访问的组件
const reloadAuthorized = (): void => {
    Authorized = RenderAuthorize(getAuthority())
}

export { reloadAuthorized }
export default Authorized