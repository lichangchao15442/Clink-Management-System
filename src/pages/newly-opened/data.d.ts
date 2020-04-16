

export interface newlyOpenedStateType {
    //
}


export interface WesternMedicineTableDataType {
    serialNumber: number;
    groupNumber: number;
    key: string;
    name: string;
    singleUsage: number;
    usage: number;
    frequency: number;
    days: number;
    total: number;
    unitPrice: number;
}

export interface ChineseMedicineTableDataType {
    serialNumber: number;
    key: string;
    name: string;
    singleDose: number;
    usage: number;
    unitPrice: number;
    amount: number;
}

export interface CheckTableDataType {
    serialNumber: number;
    key: string;
    name: string;
    part: string;
    quantity: number;
    usage: number;
    unitPrice: number;
    amount: number;
    remark: string;
}

export interface CurrentPrescriptionType {
    id: number;
    type: number;
    name: string;
    data: any
}