import request from '@/utils/request'
import { EditRegisterFields } from './data'

export async function queryRegisterList(query: any) {
    return request('/api/queryRegisterList', {
        params: query
    })
}

export async function updateRegister(params: EditRegisterFields) {
    return request('/api/updateRegister', {
        method: 'POST',
        data: params
    })
}