import CheckPermissions from './CheckPermissions'


/**
 * 默认不能访问任何页面
 */
const Exception403 = () => 403

/**
 * 确定传入组件是否已经实例化
 */
const checkIsInstantitation = (target: React.ComponentClass | React.ReactNode) => { }

/**
 * 用于判断是否拥有权限访问此view权限
 * @param {string | function | Promise} authority
 * @param {ReactNode} error 非必需参数
 */
const authorize = (authority: string, error?: React.ReactNode) => {
    /**
     * 防止传入字符串时找不到staticContext造成报错
     */
    let classError: boolean | React.FunctionComponent = false
    if (error) {
        classError = (() => error) as React.FunctionComponent
    }
    if (!authority) {
        throw new Error('authority is required')
    }
    return function decideAuthority(target: React.ComponentClass | React.ReactNode) {
        const component = CheckPermissions(authority, target, classError || Exception403)
    }
}