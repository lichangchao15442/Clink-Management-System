
export interface outpatientRecordsType {
    id: number;
    avatar: string;
    patientName: string;
    vipLevel: number;
    gender: number;
    age: number;
    visitStatus: number;
    createTime: string;
    department: number;
    doctorName: string;
    mobile: string;
}

export interface ModelState {
    outpatientRecordsList: outpatientRecordsType[];
    total: number
}