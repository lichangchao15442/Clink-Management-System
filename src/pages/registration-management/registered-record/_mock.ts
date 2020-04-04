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
            IDNumber: '@id()',
            patientName: '@cname()',
            'id|+1': 100100,
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
            birthday: '@datetime()',
            chargeDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
            refundDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
            'amountReceivable|60-100': 1,
            'actualMoney|20-60': 1,
            'refundAmount|20-60': 1,
            'discountedPrice|10-20': 1,
            'medicarePayment|10-20': 1,
            'attendanceStatus|10001500-10001502': 1,
            'paymentMethod|10001200-10001204': 1,
            'outpatientType|10000300-10000301': 1,
            'registrationFee|10001300-10001302': 1,
            'medicalFee|10001400-10001401': 1,
            registrar: '@cname()',
            address: '@county(true)',
            addressDetail: '某某街道',
            note: '@sentence()',
        }
    ]
})

let allRegisteredPatients = registeredPatients.data

export default {
    'GET /api/queryRegisteredPatient': (req: Request, res: Response) => {
        const { query } = req
        let data = allRegisteredPatients
        Object.keys(query).forEach(key => {
            if ({}.hasOwnProperty.call(query, key)) {
                data = data.filter((item: RegisteredPatientType) => {
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
        const pendingRegisteredPatients = data.filter((_: RegisteredPatientType) => _?.attendanceStatus === 10001500)
        const consultedRegisteredPatients = data.filter((_: RegisteredPatientType) => _.attendanceStatus === 10001501)
        const bouncedRegisteredPatients = data.filter((_: RegisteredPatientType) => _.attendanceStatus === 10001502)

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
    },
    'GET /api/queryRegisterList': (req: Request, res: Response) => {
        const { registeredNumber } = req.query
        const data = allRegisteredPatients.find((_: RegisteredPatientType) => Number(_.registeredNumber) === Number(registeredNumber))
        res.send({ data })
    },
    'POST /api/updateRegister': (req: Request, res: Response) => {
        const { body } = req
        const { registeredNumber, operationType, ...data } = body
        allRegisteredPatients = allRegisteredPatients.map((item: RegisteredPatientType) => {
            if (item.registeredNumber === registeredNumber) {
                return {
                    ...item,
                    ...data
                }
            }
            return item
        })
        if (operationType === 'edit') {
            res.send({ type: 'edit', status: 'ok' })
        } else if (operationType === 'resign') {
            res.send({ type: 'resign', status: 'ok' })
        }

    }
}