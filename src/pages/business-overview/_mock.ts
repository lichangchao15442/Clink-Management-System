import Mock from 'mockjs'
import { Request, Response } from 'express'

const introduceData = [
    {
        name: 'registered',
        number: 56,
        percent: '20%'
    },
    {
        name: 'admission',
        number: 75,
        percent: '10%'
    },
    {
        name: 'income',
        number: 6500,
        percent: '27%'
    },
    {
        name: 'newVips',
        number: 20,
        percent: '30%'
    },
]

const incomeTrendWeek = Mock.mock({
    'data|7': [
        {
            date: "@date('MM-dd')",
            'value|2000-5000': 1,
            name: 'income'
        }
    ]
})

const incomeTrendMonth = Mock.mock({
    'data|30': [
        {
            date: '@date("MM-dd")',
            'value|2000-5000': 1,
            name: 'income'
        }
    ]
})

const memberSpendingData = [
    {
        type: 'vip',
        count: 5000
    },
    {
        type: 'normal',
        count: 3000
    },
]

const outpatientRecords = Mock.mock({
    'data|50-70': [
        {
            'id|+1': 100000,
            'visitStatus|10000200-10000202': 1,
            patientName: '@cname()',
            'gender|0-1': 1,
            'age|1-99': 1,
            'mobile': /^1[385][1-9]\d{8}/,
            'outpatientType|10000300-10000301': 1,
            'department|10000000-10000002': 1,
            registeredDoctor: '@cname()',
            lastUpdateTime: '@datetime()'
        }
    ]
})

const getFakeOverviewData = {
    introduceData,
    incomeTrendWeek: incomeTrendWeek.data,
    memberSpendingData,
    outpatientRecordsData: outpatientRecords.data
}

export default {
    'GET /api/fake_business_overview_data': getFakeOverviewData,
    'GET /api/fake_income_trend': (req: Request, res: Response) => {
        const { type } = req.query
        if (type === 'week') {
            res.send({
                incomeTrendWeek: incomeTrendWeek.data
            })
        } else if (type === 'month') {
            res.send({
                incomeTrendMonth: incomeTrendMonth.data
            })
        }
    }
}