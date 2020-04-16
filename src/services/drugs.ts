import request from '@/utils/request'

interface queryDrugsParamsType {
    prescriptionType: number;
    drugType?: number;
}

export async function queryDrugs(params: queryDrugsParamsType) {
    return request('/api/queryDrugs', {
        method: 'GET',
        params
    })
}