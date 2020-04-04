import React from 'react'
import { Card, Table } from 'antd'
import { formatMessage } from 'umi-plugin-react/locale'

import {
    departments,
    outpatientTypes,
    registrationFeeOptions,
    medicalFeeOptions
} from '@/utils/dataDictionary'
import { RegisteredPatientType } from '../../../registered-record/data'

const columns = [
    {
        title: '',
        dataIndex: 'one',
    },
    {
        title: '',
        dataIndex: 'two',
    },
    {
        title: '',
        dataIndex: 'three',
    },
    {
        title: '',
        dataIndex: 'four',
    },
    {
        title: '',
        dataIndex: 'five',
    },
];

interface RegisInfoOfOthersProps {
    data: RegisteredPatientType;
    loading: boolean;
}

const RegisInfoOfOthers: React.FC<RegisInfoOfOthersProps> = ({ data, loading }) => {
    // 处理数据
    const department = departments.find(_ => _.key === data.department)?.label
    const outpatientType = outpatientTypes.find(_ => _.key === data.outpatientType)?.label
    const registrationFee = registrationFeeOptions.find(_ => _.key === data.registrationFee)?.value
    const medicalFee = medicalFeeOptions.find(_ => _.key === data.medicalFee)?.value
    const dataSource = [
        {
            id: 1,
            one: `${formatMessage({ id: 'registrationandmanagement.registeredandrecord.registeredDepartment' })}:${department}`,
            two: `${formatMessage({ id: 'commonandfields.outpatientType' })}:${outpatientType}`,
            three: `${formatMessage({ id: 'registrationandmanagement.addandregistered.admissionDoctor' })}:${data.doctorName}`,
            four: `${formatMessage({ id: 'registrationandmanagement.editandregister.registrationFee' })}:${Number(registrationFee).toFixed(2)}`,
            five: `${formatMessage({ id: 'registrationandmanagement.editandregister.medicalFee' })}:${Number(medicalFee).toFixed(2)}`,
        }
    ]
    return (
        <Card
            className='card-title'
            title={formatMessage({ id: 'registrationandmanagement.editandregister.registeredInformation' })}
            bordered={false}
            loading={loading}
        >
            <Table
                bordered
                pagination={false}
                showHeader={false}
                dataSource={dataSource}
                columns={columns}
                rowKey='id'
            />
        </Card>
    )
}

export default RegisInfoOfOthers