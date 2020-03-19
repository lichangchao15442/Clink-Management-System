import request from '@/utils/request'
import { currentUser } from '@/models/user'

export async function queryCurrent(id: string): Promise<any> {
    return request(`/api/currentUser?id=${id}`)
}

export async function changeProfile(params: currentUser): Promise<any> {
    return request('/api/account/changeProfile', {
        method: 'POST',
        data: params
    })
}