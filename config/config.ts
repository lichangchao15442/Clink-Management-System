import { IConfig, IPlugin } from 'umi-types';
import defaultSettings from './defaultSettings'
import webpackPlugin from './plugin.config'


const plugins: IPlugin[] = [
    ['umi-plugin-antd-icon-config', {}],
    ['umi-plugin-react', {
        antd: true,
        dva: {
            hmr: true,
        },
        title: 'clinic-management-system',
        dll: false,
        locale: {
            enable: true,
            default: 'zh-CN',
            baseNavigator: true
        },
        dynamicImport: {
            loadingComponent: './components/PageLoading/index',
            webpackChunkName: true,
            level: 3,
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
]
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
                            name: 'workplace',
                            icon: 'appstore',
                            path: '/workplace',
                            component: './workplace'
                        },
                        {
                            name: 'registration-management',
                            icon: 'form',
                            path: '/registration-management',
                            routes: [
                                {
                                    name: 'add-registered',
                                    path: '/registration-management/add-registered',
                                    component: './registration-management/add-registered'
                                },
                            ]
                        },
                        {
                            name: 'patient-management',
                            icon: 'user',
                            path: '/patient-management',
                            component: './patient-management',
                        },
                        {
                            name: 'add-patient',
                            path: '/patient-management/add-patient',
                            component: './patient-management/add-patient',
                            hideInMenu: true,
                        },
                        {
                            name: 'account',
                            path: '/account',
                            icon: 'user',
                            hideInMenu: true,
                            routes: [
                                {
                                    name: 'profile',
                                    icon: 'profile',
                                    path: '/account/profile',
                                    component: './account/profile'
                                },
                                {
                                    name: 'change-password',
                                    icon: 'eye',
                                    path: '/account/change-password',
                                    component: './account/change-password'
                                },
                            ]
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
    plugins,
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
    },
    // chainWebpack: webpackPlugin,
}

export default config;
