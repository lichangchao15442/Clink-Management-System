

export interface RegisteredPatientType {
    registeredNumber?: number | string;
    patientName?: string;
    id?: number;
    gender?: number;
    age?: number;
    ageUnit?: number;
    mobile?: string;
    department?: number;
    doctorId?: number;
    doctorName?: string;
    admissionTime?: string;
    amountReceivable?: number;
    actualMoney?: number;
    refundAmount?: number;
    attendanceStatus?: number;
    discountedPrice?: number;
    medicarePayment?: number;
    paymentMethod?: number;
    chargeDate?: string;
    refundDate?: string;
    registrar?: string;
    outpatientType?: number;
    registrationFee?: number;
    medicalFee?: number;
    birthday?: string;
    IDNumber?: number;
    address?: string;
    addressDetail?: string;
    note?: string;

}


export interface StateType {
    pendingRegisteredPatients: RegisteredPatientType[];
    consultedRegisteredPatients: RegisteredPatientType[];
    bouncedRegisteredPatients: RegisteredPatientType[];
}


export interface ColumnsType {
    title?: string;
    dataIndex?: string;
    render?: (text: string, record?: any) => ReactNode
}


export interface FilterFieldsType {
    department?: number;
    doctorName?: number;
    admissionTime?: any;
    searchKeywords?: string | null;
}
