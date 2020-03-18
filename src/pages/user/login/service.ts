import request from "umi-request";


export interface LoginParamsType {
    password: string;
    mobile: string;
    autoLogin: boolean;
}

export async function fakeAccountLogin(params: LoginParamsType) {
    return request('/api/login/account', {
        method: 'POST',
        data: params
    })
}

export async function getFakeCaptcha(mobile: string) {
    return request(`/api/login/captcha?mobile=${mobile}`)
}