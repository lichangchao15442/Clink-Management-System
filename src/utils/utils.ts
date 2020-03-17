import { Route } from '@/models/connect'
import pathRegexp from 'path-to-regexp'
import { parse } from 'querystring'


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