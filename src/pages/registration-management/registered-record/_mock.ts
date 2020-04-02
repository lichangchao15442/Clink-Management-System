import { Request, Response } from 'express'
import Mock from 'mockjs'

import { doctors, employeesDataType } from '@/../mock/employees'
import { RegisteredPatientType } from './data'


Mock.Random.extend({
    doctor() {
        return this.pick(doctors).id
    }
})

const registeredPatients = Mock.mock({
    'data|60-150': [
        {
            'registeredNumber|+1': 2020040100000000,
            patientName: '@cname()',
            'gender|0-1': 1,
            'age|1-99': 1,
            'ageUnit|10000600-10000602': 1,
            'mobile': /^1[385][1-9]\d{8}/,
            'department|10000000-10000002': 1,
            doctorId: '@doctor',
            doctorName() {
                const { doctorId } = this
                return doctors.find((_: employeesDataType) => _.id === Number(doctorId)).name
            },
            admissionTime: '@datetime()',
            'amountReceivable|60-100': 1,
            'actualMoney|20-60': 1,
            'refundAmount|20-60': 1,
            'attendanceStatus|10001500-10001502': 1,
        }
    ]
})

let allRegisteredPatients = registeredPatients.data

export default {
    'GET /api/queryRegisteredPatient': (req: Request, res: Response) => {
        const { query } = req
        Object.keys(query).forEach(key => {
            if ({}.hasOwnProperty.call(query, key)) {
                allRegisteredPatients = allRegisteredPatients.filter((item: RegisteredPatientType) => {
                    if (key === 'admissionTime') {
                        const start = new Date(query[key][0]).getTime()
                        const end = new Date(query[key][1]).getTime()
                        const now = new Date(item[key]).getTime()
                        if (start && end) {
                            return now >= start && now <= end
                        }
                        return true
                    }
                    if (key === 'department' || key === 'doctorName') {
                        const num = Number(query[key])
                        if (num === 11111111) {
                            return true
                        }
                        const bool = key === 'department' ? item.department === num : item.doctorId === num
                        return bool
                    }
                    if (key === 'searchKeywords') {
                        if (query[key]) {
                            return item.patientName === query[key]
                        }
                        return true
                    }
                    return true
                })
            }
        })
        const pendingRegisteredPatients = allRegisteredPatients.filter((_: RegisteredPatientType) => _.attendanceStatus === 10001500)
        const consultedRegisteredPatients = allRegisteredPatients.filter((_: RegisteredPatientType) => _.attendanceStatus === 10001501)
        const bouncedRegisteredPatients = allRegisteredPatients.filter((_: RegisteredPatientType) => _.attendanceStatus === 10001502)

        res.send({
            pendingRegisteredPatients,
            consultedRegisteredPatients,
            bouncedRegisteredPatients
        })

    },
    'POST /api/addRegistered': (req: Request, res: Response) => {
        const { body } = req
        allRegisteredPatients.unshift(body)
        res.send({ status: 'ok' })
    }
}