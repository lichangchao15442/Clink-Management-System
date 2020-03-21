import request from '@/utils/request'

export async function fakeData() {
    return request('/api/fake_business_overview_data')
}

export async function fakeIncomeTrendData(type:string) {
    return request(`/api/fake_income_trend?type=${type}`)
}