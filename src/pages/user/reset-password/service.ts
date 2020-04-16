import request from '@/utils/request'
import { resetPasswordParams } from './index'

export async function resetPassword(params: resetPasswordParams) {
    return request('/api/reset-password', {
        method: 'POST',
        data: params
    })
}