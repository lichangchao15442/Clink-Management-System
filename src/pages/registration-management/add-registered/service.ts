import request from '@/utils/request'


export async function addRegistered(params) {
    return request('/api/addRegistered', {
        method: 'POST',
        data: params
    })
}

