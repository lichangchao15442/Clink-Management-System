import request from '@/utils/request'


export async function queryPatients(params: any) {
    return request('/api/queryPatients', {
        params
    })
}

export async function addPatient(params: any) {
    return request('/api/addPatient', {
        method: 'POST',
        data: params
    })
}

export async function deletePatient(params: any) {
    return request('/api/deletePatient', {
        method: 'POST',
        data: params
    })
}

export async function updatePatient(params: any) {
    return request('/api/updatePatient', {
        method: 'POST',
        data: params
    })
}