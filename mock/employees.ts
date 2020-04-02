import Mock from 'mockjs'

export interface employeesDataType {
    id: number;
    name: string;
    gender?: number;
    age?: number;
    mobile?: string;
    affiliatedClinic?: number;
    department?: number;
    role?: number;
    createTime?: string;
    createPeople?: string;
    employeeStatus?: number;
}

const employeesData = Mock.mock({
    'data|30-60': [
        {
            'id|+1': 10000,
            name: '@cname()',
            'gender|0-1': 1,
            'age|18-60': 1,
            'mobile': /^1[385][1-9]\d{8}/,
            'affiliatedClinic|10000500-10000501': 1,
            'department|10000000-10000002': 1,
            'role|10000100-10000104': 1,
            createTime: '@datetime()',
            createPeople: '@cname()',
            'employeeStatus|0-1': 1,
        }
    ]
})

export const doctors = employeesData.data.filter((_: employeesDataType) => _.role === 10000101)