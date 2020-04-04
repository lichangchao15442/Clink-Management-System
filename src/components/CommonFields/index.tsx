import React from 'react'
import { Col, Form, DatePicker, Input, Select, Cascader, Avatar } from 'antd'
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale'
import {
    ageUnits,
    patientSources,
    vipLevels,
    maritalStatus,
    educations,
    occupations
} from '@/utils/dataDictionary'
import areaTree from '@/utils/city'
import styles from './index.less'

const { Option } = Select

const colProps = {
    lg: 6,
    md: 12,
    sm: 24
}

export const PatientName = () => (
    <Col {...colProps}>
        <Form.Item
            label={formatMessage({ id: 'commonandfields.patientName' })}
            name="name"
            rules={[{ required: true, message: formatMessage({ id: 'commonandfields.patientName.required' }) }]}
        >
            <Input placeholder={formatMessage({ id: 'commonandfields.patientName.placeholder' })} />
        </Form.Item>
    </Col>
)

export const PatientCardNumber = ({ disabled }: { disabled?: boolean }) => (
    <Col {...colProps}>
        <Form.Item
            label={formatMessage({ id: 'commonandfields.patientCardNumber' })}
            name="id"
            rules={[{ required: true, message: formatMessage({ id: 'commonandfields.patientCardNumber.required' }) }]}
        >
            <Input
                placeholder={formatMessage({ id: 'commonandfields.patientCardNumber.placeholder' })}
                disabled={disabled || false}
            />
        </Form.Item>
    </Col>
)

export const PatientAge = () => (
    <Col {...colProps}>
        <Form.Item label={formatMessage({ id: 'commonandfields.patientAge' })}>
            <Input.Group compact>
                <Form.Item
                    noStyle
                    name="age"
                    rules={[{ required: true, message: formatMessage({ id: 'commonandfields.patientAge.required' }) }]}
                >
                    <Input placeholder={formatMessage({ id: 'commonandfields.patientAge.placeholder' })} style={{ width: '76%' }} />
                </Form.Item>
                <Form.Item noStyle name='ageUnit'>
                    <Select defaultValue={ageUnits[ageUnits.length - 1].key} style={{ width: '24%' }}>
                        {ageUnits.map(item => <Option key={item.key} value={item.key}>{item.label}</Option>)}
                    </Select>
                </Form.Item>
            </Input.Group>
        </Form.Item>
    </Col>
)

export const Birthday = () => (
    <Col {...colProps}>
        <Form.Item
            label={formatMessage({ id: 'commonandfields.birthday' })}
            name="birthday"
            rules={[{ required: true, message: formatMessage({ id: 'commonandfields.birthday.required' }) }]}
        >
            <DatePicker style={{ width: '100%' }} placeholder={formatMessage({ id: 'commonandfields.birthday.placeholder' })} />
        </Form.Item>
    </Col>
)

export const Gender = () => (
    <Col {...colProps}>
        <Form.Item
            label={formatMessage({ id: 'commonandfields.gender' })}
            name="gender"
            rules={[{ required: true, message: formatMessage({ id: 'commonandfields.gender.required' }) }]}
        >
            <Select placeholder={formatMessage({ id: 'commonandfields.pleaseSelect' })}>
                <Option value={0}><FormattedMessage id='dataanddictionary.gender.male' /></Option>
                <Option value={1}><FormattedMessage id='dataanddictionary.gender.female' /></Option>
            </Select>
        </Form.Item>
    </Col>
)

export const Mobile = () => (
    <Col {...colProps}>
        <Form.Item
            label={formatMessage({ id: 'commonandfields.mobile' })}
            name="mobile"
        >
            <Input placeholder={formatMessage({ id: 'commonandfields.mobile.placeholder' })} />
        </Form.Item>
    </Col>
)

export const IDNumber = () => (
    <Col {...colProps}>
        <Form.Item
            label={formatMessage({ id: 'commonandfields.IDNumber' })}
            name="IDNumber"
        >
            <Input placeholder={formatMessage({ id: 'commonandfields.IDNumber.placeholder' })} />
        </Form.Item>
    </Col>
)

export const PatientSource = () => (
    <Col {...colProps}>
        <Form.Item
            label={formatMessage({ id: 'commonandfields.patientSource' })}
            name="patientSource"
        >
            <Select placeholder={formatMessage({ id: 'commonandfields.pleaseSelect' })}>
                {patientSources.map(item => <Option key={item.key} value={item.key}>{item.label}</Option>)}
            </Select>
        </Form.Item>
    </Col>
)

export const VipLevel = () => (
    <Col {...colProps}>
        <Form.Item
            label={formatMessage({ id: 'commonandfields.vipLevel' })}
            name="vipLevel"
        >
            <Select placeholder={formatMessage({ id: 'commonandfields.pleaseSelect' })}>
                {vipLevels.map(item => <Option key={item.key} value={item.key}>{item.label}</Option>)}
            </Select>
        </Form.Item>
    </Col>
)

export const ExpireDate = () => (
    <Col {...colProps}>
        <Form.Item
            label={formatMessage({ id: 'commonandfields.expireDate' })}
            name="expireDate"
        >
            <DatePicker style={{ width: '100%' }} placeholder={formatMessage({ id: 'commonandfields.expireDate.placeholder' })} />
        </Form.Item>
    </Col>
)

export const Nation = () => (
    <Col {...colProps}>
        <Form.Item
            label={formatMessage({ id: 'commonandfields.nation' })}
            name="nation"
        >
            <Input />
        </Form.Item>
    </Col>
)

export const MaritalStatus = () => (
    <Col {...colProps}>
        <Form.Item
            label={formatMessage({ id: 'commonandfields.maritalStatus' })}
            name="maritalStatus"
        >
            <Select placeholder={formatMessage({ id: 'commonandfields.pleaseSelect' })}>
                {maritalStatus.map(item => <Option key={item.key} value={item.key}>{item.label}</Option>)}
            </Select>
        </Form.Item>
    </Col>
)

export const Education = () => (
    <Col {...colProps}>
        <Form.Item
            label={formatMessage({ id: 'commonandfields.education' })}
            name="education"
        >
            <Select placeholder={formatMessage({ id: 'commonandfields.pleaseSelect' })}>
                {educations.map(item => <Option key={item.key} value={item.key}>{item.label}</Option>)}
            </Select>
        </Form.Item>
    </Col>
)

export const Address = () => (
    <Col {...colProps}>
        <Form.Item
            label={formatMessage({ id: 'commonandfields.address' })}
            name='address'
        >
            <Cascader
                options={areaTree}
                placeholder={formatMessage({ id: 'commonandfields.pleaseSelect' })}
            />
        </Form.Item>
    </Col>
)

export const AddressDetail = () => (
    <Col {...colProps} lg={12}>
        <Form.Item
            label={' '}
            name='addressDetail'
        >
            <Input placeholder={formatMessage({ id: 'commonandfields.addressDetail' })} />
        </Form.Item>
    </Col>
)

export const Occupation = () => (
    <Col {...colProps}>
        <Form.Item
            label={formatMessage({ id: 'commonandfields.occupation' })}
            name="occupation"
        >
            <Select placeholder={formatMessage({ id: 'commonandfields.pleaseSelect' })}>
                {occupations.map(item => <Option key={item.key} value={item.key}>{item.label}</Option>)}
            </Select>
        </Form.Item>
    </Col>
)

export const Employer = () => (
    <Col {...colProps}>
        <Form.Item
            label={formatMessage({ id: 'commonandfields.employer' })}
            name='employer'
        >
            <Input />
        </Form.Item>
    </Col>
)

export const Note = ({ newColProps }: { newColProps?: any }) => (
    <Col {...colProps} lg={12} {...newColProps}>
        <Form.Item
            label={formatMessage({ id: 'commonandfields.note' })}
            name='note'
        >
            <Input />
        </Form.Item>
    </Col>
)

interface SearchPatientProps {
    patients: any;
    newColProps: any;
    disabled?: boolean;
    onChange?: (value: number) => void;
}

export const SearchPatient: React.FC<SearchPatientProps> = ({ patients, newColProps, onChange, disabled }) => (
    < Col {...newColProps}>
        <Form.Item
            label={formatMessage({ id: 'commonandfields.patientName' })}
            name="patientName"
            rules={[{ required: true, message: formatMessage({ id: 'commonandfields.patientName.required' }) }]}
        >
            <Select
                showSearch
                placeholder={formatMessage({ id: 'commonandfields.searchPatient.placeholder' })}
                optionFilterProp="children"
                disabled={disabled || false}
                onChange={onChange || (() => { })}
                filterOption={(input, option) => {
                    const parseInput = input.replace(/\s*/g, '')
                    const optionItem = patients.find((_: any) => _.id === option.value)
                    let bool = true
                    if (parseInput) {

                        if (optionItem.mobile) {
                            bool = optionItem.name.indexOf(parseInput) !== -1 ||
                                optionItem.mobile.indexOf(parseInput) !== -1 ||
                                optionItem.id.toString().indexOf(parseInput) !== -1
                        } else {
                            bool = optionItem.name.indexOf(parseInput) !== -1 ||
                                optionItem.id.toString().indexOf(parseInput) !== -1
                        }
                    }
                    return bool
                }
                }
            >
                {patients.length !== 0 && patients.map(item =>
                    <Option key={item.id} value={item.id}>
                        <div className={styles.patientsOption}>
                            <Avatar className={styles.avatar} src={item.avatar} />
                            <div className={styles.info}>
                                <div>
                                    <span className={styles.name}>{item.name}</span>
                                    <span>{item.genderText}</span>
                                    <span>{item.ageAndAgeUnit}</span>
                                </div>
                                <div>{item.mobile}</div>
                            </div>
                        </div>
                    </Option>)}
            </Select>
        </Form.Item>
    </Col >
)