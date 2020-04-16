import React from 'react'
import { Card, Table } from 'antd'
import { formatMessage } from 'umi-plugin-react/locale'
import { paymentMethods } from '@/utils/dataDictionary'
import { RegisteredPatientType } from '../../registered-record/data'

interface OrderInformationProps {
    data: RegisteredPatientType;
    loading: boolean;
    attendanceStatus?: number;
}

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
];
const OrderInformation: React.FC<OrderInformationProps> = ({ data, loading, attendanceStatus }) => {
    const paymentMethod = paymentMethods.find(_ => _.key === data.paymentMethod)?.label
    // 处理数据：处理成Table格式的数据
    const dataSource = [
        {
            id: 1,
            one: `${formatMessage({ id: 'registrationandmanagement.editandregister.orderNumber' })}:${data?.registeredNumber}`,
            two: `${formatMessage({ id: 'registrationandmanagement.addandregistered.amountReceivable' })}:${data?.amountReceivable?.toFixed(2)}`,
            three: `${formatMessage({ id: 'registrationandmanagement.editandregister.discountedPrice' })}:${data?.discountedPrice?.toFixed(2)}`,
            four: `${formatMessage({ id: 'registrationandmanagement.editandregister.medicarePayment' })}:${data?.medicarePayment?.toFixed(2)}`,
        },
        {
            id: 2,
            one: `${formatMessage({ id: 'registrationandmanagement.addandregistered.actualMoneys' })}:${data?.actualMoney?.toFixed(2)}`,
            two: `${formatMessage({ id: 'registrationandmanagement.addandregistered.paymentMethod' })}:${paymentMethod}`,
            three: `${formatMessage({ id: 'registrationandmanagement.editandregister.chargeDate' })}:${data?.chargeDate}`,
            four: `${formatMessage({ id: 'registrationandmanagement.editandregister.tollCollector' })}:${data?.registrar}`,
        },
    ]
    if (attendanceStatus === 10001502) {
        dataSource.push({
            id: 3,
            one: `${formatMessage({ id: 'registrationandmanagement.addandregistered.refundAmount' })}:${data?.refundAmount?.toFixed(2)}`,
            two: `${formatMessage({ id: 'registrationandmanagement.addandregistered.refundMethod' })}:${paymentMethod}`,
            three: `${formatMessage({ id: 'registrationandmanagement.editandregister.refundDate' })}:${data?.refundDate}`,
            four: `${formatMessage({ id: 'registrationandmanagement.editandregister.operator' })}:${data?.registrar}`,
        })
    }
    return (
        <Card
            className='card-title'
            title={formatMessage({ id: 'registrationandmanagement.editandregister.orderandinformation' })}
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


export default OrderInformation

