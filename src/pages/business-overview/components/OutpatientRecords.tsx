import React from 'react'
import { Card, Table } from 'antd'
import { formatMessage } from 'umi-plugin-react/locale'
import { OutpatientRecordsProps } from '../data.d'


const columns = [
    {
        title: formatMessage({ id: 'businessandoverview.outpatientRecords.serialNumber' }),
        dataIndex: 'key',
    },
    {
        title: formatMessage({ id: 'businessandoverview.outpatientRecords.visitStatus' }),
        dataIndex: 'visitStatus',
        key: 'visitStatus',
        render: (text: number) => {
            let context = ''
            switch (text) {
                case 0:
                    context = formatMessage({ id: 'businessandoverview.outpatientRecords.pending' })
                    break;
                case 1:
                    context = formatMessage({ id: 'businessandoverview.outpatientRecords.consulting' })
                    break;
                case 2:
                    context = formatMessage({ id: 'businessandoverview.outpatientRecords.consulted' })
                    break;

                default:
                    break;
            }
            return <span style={{ color: '#28D094' }}>{context}</span>
        }
    },
    {
        title: formatMessage({ id: 'businessandoverview.outpatientRecords.id' }),
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: formatMessage({ id: 'businessandoverview.outpatientRecords.patientName' }),
        dataIndex: 'patientName',
        key: 'patientName',
    },
    {
        title: formatMessage({ id: 'businessandoverview.outpatientRecords.gender' }),
        dataIndex: 'gender',
        key: 'gender',
        render: (text: number) => {
            if (text === 0) {
                return formatMessage({ id: 'businessandoverview.outpatientRecords.male' })
            }
            return formatMessage({ id: 'businessandoverview.outpatientRecords.female' })
        }
    },
    {
        title: formatMessage({ id: 'businessandoverview.outpatientRecords.age' }),
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: formatMessage({ id: 'businessandoverview.outpatientRecords.mobile' }),
        dataIndex: 'mobile',
        key: 'mobile',
    },
    {
        title: formatMessage({ id: 'businessandoverview.outpatientRecords.outpatientType' }),
        dataIndex: 'outpatientType',
        key: 'outpatientType',
        render: (text: number) => {
            if (text === 0) {
                return formatMessage({ id: 'businessandoverview.outpatientRecords.firstVisit' })
            }
            return formatMessage({ id: 'businessandoverview.outpatientRecords.subsequentVisit' })
        }
    },
    {
        title: formatMessage({ id: 'businessandoverview.outpatientRecords.department' }),
        dataIndex: 'department',
        key: 'department',
        render: (text: number) => {
            let context = ''
            switch (text) {
                case 0:
                    context = formatMessage({ id: 'account.profile.department.general' })
                    break;
                case 1:
                    context = formatMessage({ id: 'account.profile.department.pediatrics' })
                    break;
                case 2:
                    context = formatMessage({ id: 'account.profile.department.orthopedics' })
                    break;

                default:
                    break;
            }
            return <span>{context}</span>
        }
    },
    {
        title: formatMessage({ id: 'businessandoverview.outpatientRecords.registeredDoctor' }),
        dataIndex: 'registeredDoctor',
        key: 'registeredDoctor',
    },
    {
        title: formatMessage({ id: 'businessandoverview.outpatientRecords.lastUpdateTime' }),
        dataIndex: 'lastUpdateTime',
        key: 'lastUpdateTime',
    },
];


const OutpatientRecords = ({ data, loading }: OutpatientRecordsProps) => {
    return (<Card
        title={formatMessage({ id: 'businessandoverview.outpatientRecords.title' })}
    >
        <Table columns={columns} dataSource={data} loading={loading} />
    </Card>)
}

export default OutpatientRecords