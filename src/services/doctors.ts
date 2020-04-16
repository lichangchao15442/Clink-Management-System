import request from '@/utils/request'

export async function queryDoctors() {
    return request('/api/queryDoctors')
}
