import Authorized from './Authorized'
import renderAuthorize from './renderAuthorize'
import check from './CheckPermissions'

Authorized.check = check

const RenderAuthorize = renderAuthorize(Authorized)

export default RenderAuthorize