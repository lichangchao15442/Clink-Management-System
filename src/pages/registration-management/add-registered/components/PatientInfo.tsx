import React from 'react'
import { Card, Row } from 'antd'
import { formatMessage } from 'umi-plugin-react/locale'

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

const colProps = {
    lg: 6,
    md: 12,
    sm: 24
}

interface PatientInfoProps {
    patients: any;
    handleSelectPatient: (value: number) => void;
}

const PatientInfo: React.FC<PatientInfoProps> = ({ patients, handleSelectPatient }) => (
        <Card
            className='card-title'
            bordered={false}
            title={formatMessage({ id: 'commonandfields.patientInformation' })}
        >
            <Row gutter={16}>
                <SearchPatient
                    patients={patients}
                    newColProps={colProps}
                    onChange={handleSelectPatient}
                />
                <PatientCardNumber />
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
                <Note newColProps={{ lg: 18 }} />
            </Row>
        </Card>
    )

export default PatientInfo