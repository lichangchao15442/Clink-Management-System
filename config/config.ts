import { IConfig } from 'umi-types';
import defaultSettings from './defaultSettings'

// ref: https://umijs.org/config/
const config: IConfig = {
    treeShaking: true,
    theme: {
        'primary-color': defaultSettings.primaryColor
    },
    routes: [
        {
            path: '/',
            component: '../layouts/BlankLayout',
            routes: [
                {
                    path: '/user',
                    component: '../layouts/UserLayout',
                    routes: [
                        {
                            path: '/user',
                            redirect: '/user/login'
                        },
                        {
                            name: 'login',
                            icon: 'smile',
                            path: '/user/login',
                            component: './user/login'
                        },
                        {
                            name: 'reset-password',
                            icon: 'smile',
                            path: '/user/reset-password',
                            component: './user/reset-password'
                        },
                    ]
                },
                {
                    path: '/',
                    component: '../layouts/BasicLayout',
                    Routes: ['src/pages/Authorized'],
                    authority: ['admin', 'user'],
                    routes: [
                        {
                            name: 'business-overview',
                            icon: 'calendar',
                            path: '/business-overview',
                            component: './business-overview'
                        },
                        {
                            path: '/',
                            redirect: '/business-overview',
                            authority: ['admin', 'user']
                        },
                    ]
                }
            ]
        }
    ],
    plugins: [
        // ref: https://umijs.org/plugin/umi-plugin-react.html
        ['umi-plugin-react', {
            antd: true,
            dva: true,
            dynamicImport: false,
            title: 'clinic-management-system',
            dll: false,
            locale: {
                enable: true,
                default: 'zh-CN',
                baseNavigator: true
            },
            routes: {
                exclude: [
                    /models\//,
                    /services\//,
                    /model\.(t|j)sx?$/,
                    /service\.(t|j)sx?$/,
                    /components\//,
                ],
            },
        }],
    ],
    disableRedirectHoist: true,
    // cssLoaderOptions: {
    //     models: true,
    //     getLocalIdent: (
    //         context: {
    //             resourcePath: string
    //         },
    //         _: string,
    //         localName: string
    //     ) => {
    //         if (context.resourcePath.includes('node_modules') ||
    //             context.resourcePath.includes('global.less') ||
    //             context.resourcePath.includes('ant.design-pro.less')
    //         ) {
    //             console.log(context, localName)
    //         }
    //         return localName
    //     }
    // },
    lessLoaderOptions: {
        javascriptEnabled: true
    }
}

export default config;
