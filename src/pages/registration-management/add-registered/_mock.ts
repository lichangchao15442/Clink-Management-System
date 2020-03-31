import { Request, Response } from 'express'
import Mock from 'mockjs'


const employees = Mock.mock({
    'data|20-50': [
        {
            'id|+1': 1000,
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


export default {
    'GET /api/queryDoctors': (req: Request, res: Response) => {
        const doctors = employees.data.filter(_ => _.role === 10000101)
        res.send({ data: doctors })
    }
}