import React from 'react'
import { Card, Row } from 'antd'
import { formatMessage } from 'umi-plugin-react/locale'

import {
    PatientName,
    PatientCardNumber,
    PatientAge,
    Birthday,
    Gender,
    Mobile,
    IDNumber,
    PatientSource,
    VipLevel,
    ExpireDate,
    Nation,
    MaritalStatus,
    Education,
    Address,
    AddressDetail,
    Occupation,
    Employer,
    Note
} from '@/components/CommonFields'




const BasicInfo = () => (
        <Card
            className='card-title'
            bordered={false}
            title={formatMessage({ id: 'commonandfields.basicInformation' })}
        >
            <Row gutter={16}>
                <PatientName />
                <PatientCardNumber />
                <PatientAge />
                <Birthday />
            </Row>
            <Row gutter={16}>
                <Gender />
                <Mobile />
                <IDNumber />
                <PatientSource />
            </Row>
            <Row gutter={16}>
                <VipLevel />
                <ExpireDate />
                <Nation />
                <MaritalStatus />
            </Row>
            <Row gutter={16}>
                <Education />
                <Address />
                <AddressDetail />
            </Row>
            <Row gutter={16}>
                <Occupation />
                <Employer />
                <Note />
            </Row>
        </Card>
    )

export default BasicInfo