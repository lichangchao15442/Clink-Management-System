import React from 'react'
import { formatMessage } from 'umi-plugin-react/locale'
import { Table } from 'antd'

import { departments, AttendanceStatus } from '@/utils/dataDictionary'
import { RegisteredPatientType, ColumnsType } from '../data'


interface TableItemProps {
    dataSource: RegisteredPatientType[];
    columns: ColumnsType[]
}

const TableItem: React.FC<TableItemProps> = ({ dataSource, columns }) => {
    const pagination = {
        total: dataSource.length,
        showQuickJumper: true,
        pageSize: 10,
        showTotal: (totals: number) => `每页10条，共${totals}条`
    }

    const handleData = (lists: RegisteredPatientType[]) => {
        const newLists = lists.map((item, index) => {
            const gender = item.gender ? formatMessage({ id: 'dataanddictionary.gender.female' }) : formatMessage({ id: 'dataanddictionary.gender.male' })
            const department = departments.find(_ => _.key === item.department)!.label
            const amountReceivable = item.amountReceivable?.toFixed(2)
            const actualMoney = item.actualMoney?.toFixed(2)
            const refundAmount = item.refundAmount?.toFixed(2)
            const attendanceStatus = AttendanceStatus.find(_ => _.key === item.attendanceStatus)!.label
            return {
                ...item,
                key: index + 1,
                gender,
                department,
                amountReceivable,
                actualMoney,
                refundAmount,
                attendanceStatus
            }
        })
        return newLists
    }

    const data = dataSource.length ? handleData(dataSource) : []
    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={pagination}
        />
    )
}


export default TableItem