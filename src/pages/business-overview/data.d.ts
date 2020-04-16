
// model中stateType
export interface introduceDataType {
    name: string;
    number: number;
    percent: string;
}

export interface incomeTrendDataType {
    name: string;
    date: string;
    value: number;
}

export interface memberSpendingDataType {
    type: string;
    count: number;
}

export interface outpatientRecordsDataType {
    id: number;
    visitStatus: number;
    patientName: string;
    gender: number;
    age: number;
    mobile: string;
    outpatientType: number;
    department: number;
    registeredDoctor: string;
    lastUpdateTime: string;
    key?: number
}

export interface StateType {
    introduceData: introduceDataType[];
    incomeTrendWeek: incomeTrendDataType[];
    incomeTrendMonth: incomeTrendDataType[];
    memberSpendingData: memberSpendingDataType[];
    outpatientRecordsData: outpatientRecordsDataType[];
}


// 组件中propsType
export interface introduceRowProps extends introduceDataType {
    title?: string;
    logoSrc?: string;
    logoColor?: string;
    loading?: boolean;
}

export interface IncomeTrendProps {
    time: string;
    handleTime: (time: string) => void;
    data: incomeTrendDataType[]
}

export interface MemberSpendingProps {
    data: memberSpendingDataType[];
}

export interface OutpatientRecordsProps {
    dataSource: outpatientRecordsDataType[];
    loading?: boolean;
    pagination?: any;
}