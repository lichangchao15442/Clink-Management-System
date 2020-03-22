import request from '@/utils/request'


export async function queryOutpatientRecords(params) {
    return request('/api/queryOutpatientRecords',{
        params
    })
}