import { Request, Response } from 'express'
import { patients, randomAvatar } from '@/../mock/patients'
import { patientsType } from './data'


export default {
    'GET /api/queryPatients': (req: Request, res: Response) => {
        const { query } = req
        let newData = patients.data
        Object.keys(query).forEach(key => {
            if ({}.hasOwnProperty.call(query, key)) {
                newData = newData.filter((item: patientsType) => {
                    if (key === 'createTime') {
                        const start = new Date(query[key][0]).getTime()
                        const end = new Date(query[key][1]).getTime()
                        const now = new Date(item[key]).getTime()
                        if (start && end) {
                            return now >= start && now <= end
                        }
                        return true
                    } if (key === 'vipLevel') {
                        const bool = Number(query[key]) === 11111111 ? true : item.vipLevel === Number(query[key])
                        return bool
                    } if (key === 'searchKeywords') {
                        if (!query[key]) {
                            return true
                        }
                        const value = Number(query[key])
                        let bool = true
                        if (value) {
                            // 能转为number说明为mobile
                            bool = item.mobile === query[key]
                        } else {
                            // 否则为患者姓名
                            bool = item.name === query[key]
                        }
                        return bool
                    }
                    return false
                })
            }
        })
        res.send({
            data: newData,
            total: newData.length
        })
    },
    'POST /api/addPatient': (req: Request, res: Response) => {
        const { body } = req
        body.avatar = randomAvatar()
        patients.data.unshift(body)
        res.send({ status: 'ok' })
    },
    'POST /api/deletePatient': (req: Request, res: Response) => {
        const { id } = req.body
        patients.data = patients.data.filter(_ => _.id !== id)
        res.send({ status: 'ok' })
    },
    'POST /api/updatePatient': (req: Request, res: Response) => {
        const { body } = req
        const { id, ...other } = body
        patients.data = patients.data.map((item: patientsType) => {
            if (item.id === id) {
                return {
                    ...item,
                    ...other
                }
            }
            return item
        })
        res.send({ status: 'ok' })
    }
}