import request from '@/utils/request'
import { changePasswordParams } from './index'

export async function changePassword(params: changePasswordParams) {
    return request('/api/change-password', {
        method: 'POST',
        data: params
    })
}