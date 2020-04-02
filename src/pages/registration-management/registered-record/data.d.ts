

export interface RegisteredPatientType {
    registeredNumber?: number | string;
    patientName?: string;
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

}


export interface StateType {
    pendingRegisteredPatients: RegisteredPatientType[];
    consultedRegisteredPatients: RegisteredPatientType[];
    bouncedRegisteredPatients: RegisteredPatientType[];
}


export interface ColumnsType {
    title?: string;
    dataIndex?: string;
    render?: (text: string) => ReactNode
}


export interface FilterFieldsType {
    department?: number;
    doctorName?: number;
    admissionTime?: any;
    searchKeywords?: string | null;
}
