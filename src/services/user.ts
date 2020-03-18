import request from '@/utils/request'

export async function queryCurrent(mobile: string): Promise<any> {
    return request(`/api/currentUser?mobile=${mobile}`)
}