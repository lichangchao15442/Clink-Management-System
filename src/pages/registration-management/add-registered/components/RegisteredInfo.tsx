import React from 'react'
import { Card, Row, Col, Form, Input, Select } from 'antd'
import { formatMessage } from 'umi-plugin-react/locale'

import {
    departments,
    outpatientTypes,
    registrationFeeOptions,
    medicalFeeOptions
} from '@/utils/dataDictionary'
// import { RegisteredInfoProps } from '../data'
import { DoctorsType } from '@/models/doctors'


const { Option } = Select

const fieldLabels = {
    registeredNumber: formatMessage({ id: 'registrationandmanagement.addandregistered.registeredNumber' }),
    department: formatMessage({ id: 'commonandfields.department' }),
    outpatientType: formatMessage({ id: 'commonandfields.outpatientType' }),
    admissionDoctor: formatMessage({ id: 'registrationandmanagement.addandregistered.admissionDoctor' }),
    registrationFee: formatMessage({ id: 'registrationandmanagement.addandregistered.registrationFee' }),
    medicalFee: formatMessage({ id: 'registrationandmanagement.addandregistered.medicalFee' }),
    registeredDate: formatMessage({ id: 'registrationandmanagement.addandregistered.registeredDate' }),
    registrar: formatMessage({ id: 'registrationandmanagement.addandregistered.registrar' }),

}

interface RegisteredInfoProps {
    doctors: DoctorsType[];
}

const RegisteredInfo: React.FC<RegisteredInfoProps> = ({ doctors }) => (
    <Card
        bordered={false}
        style={{ background: '#EEEFFB' }}
    >
        <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
                <Form.Item
                    label={fieldLabels.registeredNumber}
                    name="registeredNumber"
                >
                    <Input disabled />
                </Form.Item>
            </Col>
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
                    <Select placeholder={formatMessage({ id: 'commonandfields.pleaseSelect' })}>
                        {registrationFeeOptions.map(item =>
                            <Option key={item.key} value={item.key}>{item.label}</Option>
                        )}
                    </Select>
                </Form.Item>
            </Col>
            <Col lg={6} md={12} sm={24}>
                <Form.Item
                    label={fieldLabels.medicalFee}
                    name="medicalFee"
                >
                    <Select placeholder={formatMessage({ id: 'commonandfields.pleaseSelect' })}>
                        {medicalFeeOptions.map(item =>
                            <Option key={item.key} value={item.key}>{item.label}</Option>
                        )}
                    </Select>
                </Form.Item>
            </Col>
            <Col lg={6} md={12} sm={24}>
                <Form.Item
                    label={fieldLabels.registeredDate}
                    name="registeredDate"
                >
                    <Input disabled />
                </Form.Item>
            </Col>
            <Col lg={6} md={12} sm={24}>
                <Form.Item
                    label={fieldLabels.registrar}
                    name="registrar"
                >
                    <Input disabled />
                </Form.Item>
            </Col>
        </Row>
    </Card>
)

export default RegisteredInfo