

interface doctorsType {
    id: number;
    name: string;
    gender: number;
    age: number;
    mobile: number;
    affiliatedClinic: number;
    department: number;
    role: number;
    createTime: string;
    createPeople: string;
    employeeStatus: number;
}


export interface StateType {
    doctors: doctorsType[];
}


// 
export interface RegisteredInfoProps {
    doctors: doctorsType[];
    loading: boolean;
}

export interface AddRegisteredFieldsType {
    registeredNumber?: string;
    department: number;
    outpatientTypes: number;
    doctorId: number;
    registrationFee: number;
    medicalFee?: number;
    registeredDate?: string;
    registrar?: string;
    patientName?: string;
    patientName?: number;
    id?: number;
    age?: number;
    ageUnit?: number;
    birthday?: any;
    gender?: string;
    mobile?: string;
    IDNumber?: string;
    address?: string[];
    addressDetail?: string;
    note?: string;
}

export interface RegisteredFeeFieldsType {
    discountedPrice?: number;
    discount?: number;
    medicarePayment?: number;
    actualMoney?: number;
    paymentMethod?: number;
    collectionNote?: string;
}
