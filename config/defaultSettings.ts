import { MenuTheme } from 'antd/es/menu/MenuContext'

export type contentWidth = 'Fluid' | 'Fixed';

export interface DefaultSettings {
    /**
     * 导航菜单主题
     */
    navTheme: MenuTheme;
    /**
     * ant design的主题颜色
     */
    primaryColor: string;
    /**
     * 导航菜单的定位：`sidemenu` or `topmenu`
     */
    layout: 'sidemenu' | 'topmenu';
    /**
     * 内容布局：`Fluid` or `Fixed`，仅在topmenu时生效
     */
    contentWidth: contentWidth;
    /**
     * 是否固定头部
     */
    fixedHeader: boolean;
    /**
     * 是否自动隐藏头部
     */
    autoHideHeader: boolean;
    /**
     * 是否固定侧边栏
     */
    fixSiderbar: boolean;
    menu: { locale: boolean };
    title: string;
    pwa: boolean;
    iconfontUrl: string;
    colorWeak: boolean;
}

export default {
    navTheme: 'dark',
    primaryColor: 'rgba(102, 110, 232, 1)',
    layout: 'sidemenu',
    contentWidth: 'Fluid',
    fixedHeader: false,
    autoHideHeader: false,
    fixSiderbar: false,
    colorWeak: false,
    menu: {
        locale: true
    },
    title: 'Clink Management System',
    pwa: false,
    iconfontUrl: '',
} as DefaultSettings