import React, { useState } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { Card, Radio, Button } from 'antd'
import { RadioChangeEvent } from 'antd/es/radio';
import { PlusCircleFilled, ExportOutlined } from '@ant-design/icons'
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale'
import { connect } from 'dva'
import { router } from 'umi'

import { AttendanceStatus } from '@/utils/dataDictionary'
import { DoctorsStateType, DoctorsType } from '@/models/doctors'
import { handleRefresh } from '@/utils/utils'
import { StateType, RegisteredPatientType, ColumnsType, FilterFieldsType } from './data'
import TableItem from './components/TableItem'
import Filter from './components/Filter'

import styles from './index.less'


interface RegisteredRecordProps {
    registeredRecord: StateType;
    doctors: DoctorsType[];
    location: {
        pathname: string;
        query: any
    }
    // loading: boolean;
}

const consultedColumns = [
    {
        title: formatMessage({ id: 'commonandfields.serialNumber' }),
        dataIndex: 'key',
    },
    {
        title: formatMessage({ id: 'registrationandmanagement.addandregistered.registeredNumber' }),
        dataIndex: 'registeredNumber',
    },
    {
        title: formatMessage({ id: 'commonandfields.patientName' }),
        dataIndex: 'patientName',
    },
    {
        title: formatMessage({ id: 'commonandfields.gender' }),
        dataIndex: 'gender',
    },
    {
        title: formatMessage({ id: 'commonandfields.age' }),
        dataIndex: 'age',
    },
    {
        title: formatMessage({ id: 'commonandfields.mobile' }),
        dataIndex: 'mobile',
    },
    {
        title: formatMessage({ id: 'commonandfields.department' }),
        dataIndex: 'department',
    },
    {
        title: formatMessage({ id: 'commonandfields.doctor' }),
        dataIndex: 'doctorName',
    },
    {
        title: formatMessage({ id: 'commonandfields.admissionTime' }),
        dataIndex: 'admissionTime',
    },
    {
        title: formatMessage({ id: 'registrationandmanagement.addandregistered.amountReceivable' }),
        dataIndex: 'amountReceivable',
    },
    {
        title: formatMessage({ id: 'registrationandmanagement.addandregistered.actualMoneys' }),
        dataIndex: 'actualMoney',
    },
    {
        title: formatMessage({ id: 'commonandfields.attendanceStatus' }),
        dataIndex: 'attendanceStatus',
        render: (text: string) => <span style={{ color: '#28D094' }}>{text}</span>
    },
    {
        title: formatMessage({ id: 'commonandfields.operate' }),
        dataIndex: 'operate',
        render: () => <span style={{ color: '#666EE8' }}><FormattedMessage id='commonandfields.checkDetail' /></span>
    },
]


const bouncedColumns = consultedColumns.map(item => {
    if (item.dataIndex === 'amountReceivable') {
        return {
            title: formatMessage({ id: 'registrationandmanagement.addandregistered.actualMoneys' }),
            dataIndex: 'actualMoney',
        }
    }
    if (item.dataIndex === 'actualMoney') {
        return {
            title: formatMessage({ id: 'registrationandmanagement.addandregistered.refundAmount' }),
            dataIndex: 'refundAmount',
        }
    }
    return item
})

const pendingColumns = consultedColumns.map(item => {
    if (item.dataIndex === 'operate') {
        return {
            ...item,
            render: () => (
                <div style={{ color: '#666EE8' }}>
                    <span style={{ marginRight: 6 }}><FormattedMessage id='commonandfields.edit' /></span>
                    <span style={{ marginRight: 6 }}><FormattedMessage id='commonandfields.admission' /></span>
                    <span><FormattedMessage id='commonandfields.resign' /></span>
                </div>
            )
        }
    }
    return item
})

const RegisteredRecord: React.FC<RegisteredRecordProps> = props => {
    const { registeredRecord, doctors,location } = props
    const { pathname, query } = location
    const { pendingRegisteredPatients, consultedRegisteredPatients, bouncedRegisteredPatients } = registeredRecord
    const [visitStatus, setVisitStatus] = useState(AttendanceStatus[0].value)

    // 根据就诊状态处理用于显示的数据
    let data: RegisteredPatientType[] = []
    let columns: ColumnsType[] = []
    if (visitStatus === 'pending') {
        data = pendingRegisteredPatients
        columns = pendingColumns
    } else if (visitStatus === 'consulted') {
        data = consultedRegisteredPatients
        columns = consultedColumns
    } else if (visitStatus === 'bounced') {
        data = bouncedRegisteredPatients
        columns = bouncedColumns
    }

    const handleChangeVisitStatus = (e: RadioChangeEvent) => {
        setVisitStatus(e.target.value)
    }

    const onFilterChange = (fields: FilterFieldsType) => {
        handleRefresh(pathname, query, fields)
    }

    const FilterProps = {
        doctors,
        onFilterChange,
        filters: query
    }
    return (
        <PageHeaderWrapper>
            <Card
                className='card-border-table'
                title={
                    <Radio.Group
                        className={styles.button}
                        value={visitStatus}
                        onChange={handleChangeVisitStatus}
                    >
                        {AttendanceStatus.map(item => (
                            <Radio.Button key={item.key} value={item.value}>{item.label}</Radio.Button>
                        ))}
                    </Radio.Group>
                }
                extra={
                    <div className='top-right-button'>
                        <Button
                            style={{ marginRight: 10 }}
                            type='primary'
                            icon={<PlusCircleFilled />}
                            onClick={() => router.push('/registration-management/add-registered')}
                        >
                            <FormattedMessage id='menu.registration-management.add-registered' />
                        </Button>
                        <Button
                            type='primary'
                            ghost
                            icon={<ExportOutlined />}
                        >
                            <FormattedMessage id='commonandfields.export' />
                        </Button>
                    </div>
                }
            >
                <Filter {...FilterProps} />
                <TableItem
                    dataSource={data}
                    columns={columns}
                />
            </Card>
        </PageHeaderWrapper>
    )
}

export default connect(({ registeredRecord, doctors, loading }: {
    registeredRecord: StateType,
    doctors: DoctorsStateType,
    loading: {
        effects: {
            [key: string]: boolean
        }
    }
}) =>
    ({
        registeredRecord,
        doctors: doctors.doctors,
        loading: loading.effects['registeredRecord/fetch']
    }))(RegisteredRecord)