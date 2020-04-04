import { RegisteredPatientType } from '../registered-record/data'


export interface EditRegisterStateType {
    registeredInformation: RegisteredPatientType
}


export interface EditRegisterFields {
    department: number;
    outpatientType: number;
    doctorId: number;
    registrationFee: string;
    medicalFee?: string;
    patientName: string;
    id: string;
    age?: number;
    ageUnit?: number;
    birthday: any;
    gender: number;
    mobile?: string;
    IDNumber?: string;
    address?: string[] | string;
    addressDetail?: string;
    note?: string;
    doctorName?: string;
    registeredNumber?: number;
}