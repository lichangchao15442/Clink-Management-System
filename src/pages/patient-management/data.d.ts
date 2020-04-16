
export interface patientsType {
    id: number;
    name: string;
    gender: number;
    age: number;
    ageUnit?: number;
    mobile?: number;
    vipLevel?: number;
    createTime?: string;
    operator?: string;
    avatar?: string;
    employer?: string;
    birthday?: string | Moment;
    familyMembers?: any;
    vipCardNumber?: any;
    vipCardCreateTime?: string;
    vipCardExpireDate?: string;
    vipCardNeverExpire?: boolean;
    address?: string;
}

export interface newPatientsType extends patientsType {
    key?: number;
    gender?: string;
    vipLevel?: string;
}

export interface patientManagementState {
    patients: patientsType[];
    total: number;
}

export interface setVipFormValues {
    vipCardNumber: number;
    name: string;
    expireDate: any;
    neverExpires: boolean;
}