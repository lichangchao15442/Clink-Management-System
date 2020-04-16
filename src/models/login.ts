import { router } from 'umi'
import { stringify } from 'querystring'
import { Effect } from 'dva'
import { getPageQuery } from '@/utils/utils'

interface ModelProps {
    namespace: string;
    state: {};
    effects: {
        logout: Effect
    };
    reducers: {}
}

const Model: ModelProps = {
    namespace: 'login',

    state: {

    },

    effects: {
        logout() {
            const { redirect } = getPageQuery()
            localStorage.removeItem('clinic-authority')
            localStorage.removeItem('id')
            if (window.location.pathname !== '/user/login' && !redirect) {
                router.replace({
                    pathname: '/user/login',
                    search: stringify({
                        redirect: window.location.href
                    })
                })
            }
        }
    },

    reducers: {}
}


export default Model