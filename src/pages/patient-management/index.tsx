import React, { useState } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { Card, Button, Table, message } from 'antd'
import { PlusCircleFilled, ExportOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import { connect } from 'dva'
import { Dispatch } from 'redux'
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale'
import { router } from 'umi'
import moment from 'moment'

import { vipLevels } from '@/utils/dataDictionary'
import ModalConfirm from '@/components/ModalConfirm'
import { randomNumber, handleRefresh } from '@/utils/utils'
import { patientManagementState, newPatientsType, setVipFormValues } from './data'
import Filter from './components/Filter'
import SetVip from './components/SetVip'

import styles from './index.less'


interface PatientManagementProps {
    dispatch: Dispatch;
    patientManagement: patientManagementState;
    location: {
        pathname: string;
        query: any
    }
}



const PatientManagement: React.FC<PatientManagementProps> = props => {
    const { dispatch, patientManagement, location } = props
    const { patients, total } = patientManagement
    const { pathname, query } = location
    const [visible, setVisible] = useState(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState([10000401])
    const [formValues, setFormValues] = useState({})

    const pagination = {
        total,
        showQuickJumper: true,
        pageSize: 10,
        showTotal: (totals: number) => `每页10条，共${totals}条`
    }

    const handleDelete = (record: newPatientsType) => {
        const title = formatMessage({ id: 'commonandfields.delete.confirm' })
        const content = <span>
            <ExclamationCircleFilled style={{ color: '#FFD149', fontSize: 16, marginRight: 10 }} />
            {formatMessage({ id: 'commonandfields.patient.delete.confirm.content' })}
        </span>
        const onOk = () => {
            dispatch({
                type: 'patientManagement/deletePatient',
                payload: {
                    id: record.id
                }
            })
            handleRefresh(pathname, query, {})
        }
        ModalConfirm({ title, content, onOk })
    }

    const handleSetVip = (record: newPatientsType) => {
        const newRecord = { ...record }
        newRecord.vipCardNumber = record.vipCardNumber || randomNumber()
        setFormValues(newRecord)
        setVisible(true)
    }


    const columns = [
        {
            title: formatMessage({ id: 'commonandfields.serialNumber' }),
            dataIndex: 'key',
        },
        {
            title: formatMessage({ id: 'patientandmanagement.patientNumber' }),
            dataIndex: 'id',
        },
        {
            title: formatMessage({ id: 'patientandmanagement.patientName' }),
            dataIndex: 'name',
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
            title: formatMessage({ id: 'commonandfields.vipLevel' }),
            dataIndex: 'vipLevel',
            render: (text: any) => <span className={styles.vipLevel}>{text}</span>
        },
        {
            title: formatMessage({ id: 'commonandfields.createTime' }),
            dataIndex: 'createTime',
        },
        {
            title: formatMessage({ id: 'commonandfields.operator' }),
            dataIndex: 'operator',
        },
        {
            title: formatMessage({ id: 'commonandfields.operate' }),
            key: 'operate',
            render: (text: any, record: newPatientsType) => (
                <span className={styles.operate}>
                    <a><FormattedMessage id='commonandfields.admission' /></a>
                    <a><FormattedMessage id='commonandfields.edit' /></a>
                    <a onClick={() => handleSetVip(record)}><FormattedMessage id='commonandfields.setVip' /></a>
                    <a onClick={() => handleDelete(record)}><FormattedMessage id='commonandfields.delete' /></a>
                </span>
            ),
        },
    ];

    // 处理patients数据
    const newPatients = patients && patients.map((item, index) => {
        const gender = item.gender === 0 ? formatMessage({ id: 'dataanddictionary.gender.male' }) : formatMessage({ id: 'dataanddictionary.gender.female' })
        const vipLevelItem = vipLevels.find(_ => _.key === item.vipLevel)
        let vipLevel = formatMessage({ id: 'commonandfields.notVip' })
        if (vipLevelItem && vipLevelItem.value !== 0) {
            vipLevel = `vip${vipLevelItem.value}`
        }
        return {
            ...item,
            key: index + 1,
            gender,
            vipLevel
        }
    })

    const onFilterChange = (fields: any) => {
        handleRefresh(pathname, query, fields)
    }

    const addPatient = () => {
        router.push('/patient-management/add-patient')
    }

    const initSetVip = () => {
        setVisible(false)
        setSelectedRowKeys([10000401])
        setFormValues({})
    }

    const onOk = (values: setVipFormValues) => {
        const { expireDate, neverExpires, vipCardNumber } = values
        if (!expireDate && !neverExpires) {
            message.warning(formatMessage({ id: 'commonandfields.please.select.expires.time' }))
            return
        }
        dispatch({
            type: 'patientManagement/updatePatient',
            payload: {
                id: formValues.id,
                vipCardNumber,
                vipCardCreateTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                vipCardExpireDate: moment(expireDate).format('YYYY-MM-DD HH:mm:ss'),
                vipCardNeverExpire: neverExpires,
                vipLevel: selectedRowKeys[0]
            }
        })
        initSetVip()
        handleRefresh(pathname, query, {})

    }

    const onCancel = () => {
        initSetVip()
    }


    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKey: number[]) => {
            setSelectedRowKeys(selectedRowKey)
        },
    };


    const FilterProps = {
        onFilterChange,
        filters: query
    }

    const SetVipProps = {
        visible,
        onOk,
        onCancel,
        rowSelection,
        values: formValues
    }

    return (
        <PageHeaderWrapper>
            <Card
                className={styles.main}
                extra={
                    <div className='top-right-button'>
                        <Button
                            style={{ marginRight: 10 }}
                            type='primary'
                            icon={<PlusCircleFilled />}
                            onClick={addPatient}
                        >
                            <FormattedMessage id='patientandmanagement.addPatient' />
                        </Button>
                        <Button
                            type='primary'
                            ghost
                            icon={<ExportOutlined />}>
                            <FormattedMessage id='commonandfields.export' />
                        </Button>
                    </div>
                }
            >
                <Filter {...FilterProps} />
                <Table columns={columns} dataSource={newPatients} pagination={pagination} />
                {formValues && Object.keys(formValues).length ? (<SetVip {...SetVipProps} />) : null}
            </Card>
        </PageHeaderWrapper>
    )
}

export default connect(({ patientManagement }:
    { patientManagement: patientManagementState }
) => ({
    patientManagement
}))(PatientManagement)