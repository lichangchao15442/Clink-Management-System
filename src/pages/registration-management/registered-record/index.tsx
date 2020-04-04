import React, { useState } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { Card, Radio, Button } from 'antd'
import { RadioChangeEvent } from 'antd/es/radio';
import { PlusCircleFilled, ExportOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale'
import { connect } from 'dva'
import { router } from 'umi'
import { Dispatch } from 'redux'

import { AttendanceStatus } from '@/utils/dataDictionary'
import { DoctorsStateType, DoctorsType } from '@/models/doctors'
import { handleRefresh } from '@/utils/utils'
import ModalConfirm from '@/components/ModalConfirm'
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
    };
    dispatch: Dispatch;
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


const RegisteredRecord: React.FC<RegisteredRecordProps> = props => {
    const { registeredRecord, doctors, location, dispatch } = props
    const { pathname, query } = location
    const { pendingRegisteredPatients, consultedRegisteredPatients, bouncedRegisteredPatients } = registeredRecord
    const [visitStatus, setVisitStatus] = useState(AttendanceStatus[0].value)


    const resign = (registeredNumber: number) => {
        const title = formatMessage({ id: 'registrationandmanagement.editandregister.resign.completeConfirmation' })
        const content = <span>
            <ExclamationCircleFilled style={{ color: '#FFD149', fontSize: 16, marginRight: 10 }} />
            {formatMessage({ id: 'registrationandmanagement.editandregister.resign.modalContent' })}
        </span>
        const onOk = async () => {
            await dispatch({
                type: 'editRegister/submit',
                payload: {
                    registeredNumber,
                    attendanceStatus: 10001502,
                    operationType: 'resign'
                }
            })
            handleRefresh(pathname, query, {})
        }
        ModalConfirm({ title, content, onOk })
    }

    const pendingColumns = consultedColumns.map(item => {
        if (item.dataIndex === 'operate') {
            return {
                ...item,
                render: (text: string, record: RegisteredPatientType) => (
                    <div style={{ color: '#666EE8' }}>
                        <a style={{ marginRight: 6 }} onClick={() => { router.push(`/registration-management/edit-register?registeredNumber=${record.registeredNumber}`) }}><FormattedMessage id='commonandfields.edit' /></a>
                        <a style={{ marginRight: 6 }}><FormattedMessage id='commonandfields.admission' /></a>
                        <a onClick={() => { resign(Number(record.registeredNumber)) }}><FormattedMessage id='commonandfields.resign' /></a>
                    </div>
                )
            }
        }
        return item
    })

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