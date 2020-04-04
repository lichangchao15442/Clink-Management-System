import React from 'react'
import { Card, Row, Col, Form, Select, Input } from 'antd'
import { formatMessage } from 'umi-plugin-react/locale'

import {
    departments,
    outpatientTypes,
} from '@/utils/dataDictionary'
import { DoctorsType } from '@/models/doctors'

const { Option } = Select


interface RegisteredInformationProps {
    doctors: DoctorsType[];
}


const fieldLabels = {
    department: formatMessage({ id: 'commonandfields.department' }),
    outpatientType: formatMessage({ id: 'commonandfields.outpatientType' }),
    admissionDoctor: formatMessage({ id: 'registrationandmanagement.addandregistered.admissionDoctor' }),
    registrationFee: formatMessage({ id: 'registrationandmanagement.addandregistered.registrationFee' }),
    medicalFee: formatMessage({ id: 'registrationandmanagement.addandregistered.medicalFee' }),
    registeredDate: formatMessage({ id: 'registrationandmanagement.addandregistered.registeredDate' }),
    registrar: formatMessage({ id: 'registrationandmanagement.addandregistered.registrar' }),

}

const RegisInfoOfPending: React.FC<RegisteredInformationProps> = ({ doctors }) => (
    <Card
        className='card-title'
        title={formatMessage({ id: 'registrationandmanagement.editandregister.registeredInformation' })}
        bordered={false}
    >
        <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
                <Form.Item
                    label={fieldLabels.department}
                    name="department"
                    rules={[{ required: true, message: formatMessage({ id: 'commonandfields.pleaseSelect' }) }]}
                >
                    <Select placeholder={formatMessage({ id: 'commonandfields.pleaseSelect' })}>
                        {departments.map(item =>
                            <Option key={item.key} value={item.key}>{item.label}</Option>
                        )}
                    </Select>
                </Form.Item>
            </Col>
            <Col lg={6} md={12} sm={24}>
                <Form.Item
                    label={fieldLabels.outpatientType}
                    name="outpatientType"
                    rules={[{ required: true, message: formatMessage({ id: 'commonandfields.pleaseSelect' }) }]}
                >
                    <Select placeholder={formatMessage({ id: 'commonandfields.pleaseSelect' })}>
                        {outpatientTypes.map(item =>
                            <Option key={item.key} value={item.key}>{item.label}</Option>
                        )}
                    </Select>
                </Form.Item>
            </Col>
            <Col lg={6} md={12} sm={24}>
                <Form.Item
                    label={fieldLabels.admissionDoctor}
                    name="doctorId"
                    rules={[{ required: true, message: formatMessage({ id: 'commonandfields.pleaseSelect' }) }]}
                >
                    <Select placeholder={formatMessage({ id: 'commonandfields.pleaseSelect' })}>
                        {doctors.length && doctors.map(item =>
                            <Option key={item.id} value={item.id}>{item.name}</Option>
                        )}
                    </Select>
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
                <Form.Item
                    label={fieldLabels.registrationFee}
                    name="registrationFee"
                    rules={[{ required: true, message: formatMessage({ id: 'commonandfields.pleaseSelect' }) }]}
                >
                    <Input disabled />
                </Form.Item>
            </Col>
            <Col lg={6} md={12} sm={24}>
                <Form.Item
                    label={fieldLabels.medicalFee}
                    name="medicalFee"
                >
                    <Input disabled />
                </Form.Item>
            </Col>
        </Row>
    </Card>
)

export default RegisInfoOfPending