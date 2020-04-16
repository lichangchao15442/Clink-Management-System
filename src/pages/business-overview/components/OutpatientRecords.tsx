import React from 'react'
import { Card, Table } from 'antd'
import { formatMessage } from 'umi-plugin-react/locale'
import { OutpatientRecordsProps } from '../data.d'
import { visitStatus, outpatientTypes, departments } from '@/utils/dataDictionary'


const columns = [
    {
        title: formatMessage({ id: 'businessandoverview.outpatientRecords.serialNumber' }),
        dataIndex: 'key',
    },
    {
        title: formatMessage({ id: 'businessandoverview.outpatientRecords.visitStatus' }),
        dataIndex: 'visitStatus',
        render: (text: number) => {
            const dataItem = visitStatus.find(item => item.key === text)
            return <span style={{ color: '#28D094' }}>{dataItem && dataItem.label}</span>
        }
    },
    {
        title: formatMessage({ id: 'businessandoverview.outpatientRecords.id' }),
        dataIndex: 'id',
    },
    {
        title: formatMessage({ id: 'businessandoverview.outpatientRecords.patientName' }),
        dataIndex: 'patientName',
    },
    {
        title: formatMessage({ id: 'businessandoverview.outpatientRecords.gender' }),
        dataIndex: 'gender',
        render: (text: number) => {
            if (text === 0) {
                return formatMessage({ id: 'dataanddictionary.gender.male' })
            }
            return formatMessage({ id: 'dataanddictionary.gender.female' })
        }
    },
    {
        title: formatMessage({ id: 'businessandoverview.outpatientRecords.age' }),
        dataIndex: 'age',
    },
    {
        title: formatMessage({ id: 'businessandoverview.outpatientRecords.mobile' }),
        dataIndex: 'mobile',
    },
    {
        title: formatMessage({ id: 'businessandoverview.outpatientRecords.outpatientType' }),
        dataIndex: 'outpatientType',
        render: (text: number) => {
            const textItem = outpatientTypes.find(item => item.key === text)
            return textItem && textItem.label
        }
    },
    {
        title: formatMessage({ id: 'businessandoverview.outpatientRecords.department' }),
        dataIndex: 'department',
        render: (text: number) => {
            const textItem = departments.find(item => item.key === text)
            return textItem && textItem.label
        }
    },
    {
        title: formatMessage({ id: 'businessandoverview.outpatientRecords.registeredDoctor' }),
        dataIndex: 'registeredDoctor',
    },
    {
        title: formatMessage({ id: 'businessandoverview.outpatientRecords.lastUpdateTime' }),
        dataIndex: 'lastUpdateTime',
    },
];


const OutpatientRecords = (props: OutpatientRecordsProps) => {
    return (<Card
        title={formatMessage({ id: 'businessandoverview.outpatientRecords.title' })}
    >
        <Table
            columns={columns}
            {...props} />
    </Card>)
}

export default OutpatientRecords