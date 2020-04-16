import request from '@/utils/request'
import {FilterFieldsType} from './data'


export async function queryRegisteredPatient(params:FilterFieldsType) {
    return request('/api/queryRegisteredPatient', { params })
}
