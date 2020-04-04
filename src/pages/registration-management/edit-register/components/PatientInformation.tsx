import React from 'react'
import { Card, Row } from 'antd'
import { formatMessage } from 'umi-plugin-react/locale'

import { patientsType } from '@/pages/patient-management/data'


import {
    SearchPatient,
    PatientCardNumber,
    PatientAge,
    Birthday,
    Gender,
    Mobile,
    IDNumber,
    Address,
    AddressDetail,
    Note
} from '@/components/CommonFields'

interface PatientInformationProps {
    patients: patientsType[];
}


const colProps = {
    lg: 6,
    md: 12,
    sm: 24
}


const PatientInformation: React.FC<PatientInformationProps> = ({ patients }) => (
    <Card
        className='card-title'
        title={formatMessage({ id: 'commonandfields.patientInformation' })}
        bordered={false}
    >
        <Row gutter={16}>
            <SearchPatient
                patients={patients}
                newColProps={colProps}
                disabled
            />
            <PatientCardNumber disabled />
            <PatientAge />
            <Birthday />
        </Row>
        <Row gutter={16}>
            <Gender />
            <Mobile />
            <IDNumber />
        </Row>
        <Row gutter={16}>
            <Address />
            <AddressDetail />
        </Row>
        <Row gutter={16}>
            <Note />
        </Row>
    </Card>
)

export default PatientInformation