import { Route } from '@/models/connect'
import pathRegexp from 'path-to-regexp'
import { parse } from 'querystring'
import { router } from 'umi'
import { stringify } from 'qs'
import moment from 'moment'


export const getRouteAuthority = (path: string, routeData: Route[]) => {
    let authorities: string[] | string | undefined
    routeData.forEach(route => {
        if (pathRegexp(`${route.path}/(.*)`).test(`${path}/`)) {
            if (route.authority) {
                authorities = route.authority
            }
            // 完全匹配（精准匹配）
            if (route.path === path) {
                authorities = route.authority || authorities
            }
            if (route.routes) {
                authorities = getRouteAuthority(path, route.routes) || authorities
            }
        }
    })
    return authorities
}

export const getPageQuery = () => parse(window.location.href.split('?')[1])

export const getAuthorityFromRouter = <T extends Route>(
    routers: T[] = [],
    pathname: string
): T | undefined => {
    const authority = routers.find(
        ({ routes, path = '/' }) =>
            (path && pathRegexp(path).exec(pathname)) ||
            (routes && getAuthorityFromRouter(routes, pathname))
    )
    if (authority) return authority
    return undefined
}


// 根据日期和6位随机数生成一个唯一的号码
const setTimeDateFmt = (s: any) =>   // 个位数补齐十位数
    s < 10 ? `0${s}` : s

export const randomNumber = () => {
    const now = new Date()
    let month = now.getMonth() + 1
    let day = now.getDate()
    let hour = now.getHours()
    let minutes = now.getMinutes()
    let seconds = now.getSeconds()
    month = setTimeDateFmt(month)
    day = setTimeDateFmt(day)
    hour = setTimeDateFmt(hour)
    minutes = setTimeDateFmt(minutes)
    seconds = setTimeDateFmt(seconds)
    const orderCode = now.getFullYear().toString() + month.toString() + day + hour + minutes + seconds + (Math.round(Math.random() * 1000000)).toString();
    return orderCode;
}

// 条件过滤
/**
 * 将查询条件更新到路由中
 * @param pathname：当前页面路由
 * @param query ：url中的搜索条件
 * @param newQuery ：form中新的搜索条件
 */
export const handleRefresh = (pathname: string, query: any, newQuery: any) => {
    router.push({
        pathname,
        search: stringify(
            {
                ...query,
                ...newQuery
            },
            {
                arrayFormat: 'repeat'
            }
        )

    })
}

/**
 * 用于转换时间选择器的格式来回显时间：将字符串形式转为Moment形式
 */
export const strDateToMoment = (strDate: [string, string] | null) => {
    const initCreateTimes = []
    if (strDate && strDate[0]) {
        initCreateTimes[0] = moment(strDate[0])
    }
    if (strDate && strDate[1]) {
        initCreateTimes[1] = moment(strDate[1])
    }
    return initCreateTimes
}
