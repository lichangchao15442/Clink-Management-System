import React from 'react'
import { Row, Col, Form,Select } from 'antd'
import { formatMessage } from 'umi-plugin-react/locale'


import CommonFields from '@/components/CommonFields'
import { patientsType } from '@/pages/patient-management/data'
import { diagnosticResults,medicalAdvices } from '@/utils/dataDictionary'

const {
    SearchPatient,
    PatientCardNumber,
    PatientAge,
    Birthday,
    Gender,
    Mobile,
    IDNumber,
    OutpatientType,
    Address,
    AddressDetail
} = CommonFields

const { Option } = Select

interface PatientInformationProps {
    patients: patientsType[]
    onChange: (patientId: number) => void
}

const PatientInformation: React.FC<PatientInformationProps> = ({ patients, onChange }) => {
    return (
        <div>
            <Row gutter={16}>
                <SearchPatient patients={patients} onChange={onChange} />
                <PatientCardNumber />
                <PatientAge />
                <Birthday />
            </Row>
            <Row gutter={16}>
                <Gender />
                <Mobile />
                <IDNumber />
                <OutpatientType />
            </Row>
            <Row gutter={16}>
                <Address />
                <AddressDetail />
            </Row>
            <Row gutter={16}>
                <Col lg={12} md={24} sm={24}>
                    <Form.Item
                        label={formatMessage({ id: 'newlyandopened.diagnosis' })}
                        name='diagnosis'
                        rules={[{ required: true, message: formatMessage({ id: 'newlyandopened.diagnosis.required' }) }]}
                    >
                        <Select
                            mode="multiple"
                        >
                            {diagnosticResults.map(item => <Option key={item.key} value={item.key}>{item.label}</Option>)}
                        </Select>
                    </Form.Item>
                </Col>
                <Col lg={12} md={24} sm={24}>
                    <Form.Item
                        label={formatMessage({ id: 'newlyandopened.medicalAdvice' })}
                        name='medicalAdvice'
                    >
                        <Select
                            mode="multiple"
                        >
                            {medicalAdvices.map(item => <Option key={item.key} value={item.key}>{item.label}</Option>)}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
        </div>
    )
}

export default PatientInformation