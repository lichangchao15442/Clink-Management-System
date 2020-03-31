import React, { useState } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { Card, Form, Row, Button, Col, Input, InputNumber, Select, Cascader, Popover } from 'antd'
import { SaveFilled, CloseCircleOutlined } from '@ant-design/icons'
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale'
import { connect } from 'dva'
import { Dispatch } from 'redux'
import { ValidateErrorEntity, InternalNamePath } from 'rc-field-form/es/interface'

import areaTree from '@/utils/city'
import { departments, roles } from '@/utils/dataDictionary'
import { currentUser as currentUserState, UserModelState } from '@/models/user'

import styles from './index.less'

const { Option } = Select

const fieldLabels = {
    employeeId: formatMessage({ id: 'account.profile.employeeId' }),
    name: formatMessage({ id: 'account.profile.name' }),
    age: formatMessage({ id: 'account.profile.age' }),
    gender: formatMessage({ id: 'account.profile.gender' }),
    mobile: formatMessage({ id: 'account.profile.mobile' }),
    email: formatMessage({ id: 'account.profile.email' }),
    idNumber: formatMessage({ id: 'account.profile.idNumber' }),
    job: formatMessage({ id: 'account.profile.job' }),
    address: formatMessage({ id: 'account.profile.address' }),
    addressDetail: formatMessage({ id: 'account.profile.addressDetail' }),
    department: formatMessage({ id: 'account.profile.department' }),
    role: formatMessage({ id: 'account.profile.role' }),
    // password: formatMessage({ id: 'account.profile.password' }),
}




interface ProfileProps {
    currentUser: currentUserState;
    saveLoading: boolean;
    dispatch: Dispatch
}

interface ErrorField {
    name: InternalNamePath;
    errors: string[];
}

const Profile: React.FC<ProfileProps> = props => {
    const { currentUser, saveLoading } = props
    const [form] = Form.useForm()
    const [error, setError] = useState<ErrorField[]>([])

    const onFinish = (values: currentUserState) => {
        setError([])
        const { dispatch } = props
        dispatch({
            type: 'user/changeProfile',
            payload: values
        })
    }

    const onFinishFailed = (errors: ValidateErrorEntity) => {
        setError(errors.errorFields)
    }

    const getErrorInfo = (errors: ErrorField[]) => {
        const errorCount = errors.filter(item => item.errors.length > 0).length
        if (!errors || errorCount === 0) {
            return null
        }
        const scrollToField = (fieldKey: string) => {
            const labelNode = document.querySelector(`label[for=${fieldKey}]`)
            if (labelNode) {
                labelNode.scrollIntoView(true)
            }
        }
        const errorList = errors.map(err => {
            if (!err || err.errors.length === 0) {
                return null
            }
            const key = err.name[0] as string
            return (
                <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
                    <CloseCircleOutlined className={styles.errorIcon} />
                    <div>{err.errors[0]}</div>
                    <div className={styles.errorField}>{fieldLabels[key]}</div>
                </li>
            )
        })
        return (
            <span className={styles.errorIcon}>
                <Popover
                    title={formatMessage({ id: 'form.validate.info' })}
                    trigger='click'
                    content={errorList}
                    overlayClassName={styles.errorPopover}
                    getPopupContainer={(trigger: HTMLElement) => {
                        if (trigger && trigger.parentNode) {
                            return trigger.parentNode as HTMLElement
                        }
                        return trigger
                    }}
                >
                    <CloseCircleOutlined />
                </Popover>
            </span>
        )
    }

    return (
        Object.keys(currentUser).length ? <Form
            form={form}
            layout='vertical'
            initialValues={currentUser}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <PageHeaderWrapper>
                <Card bordered={false}>
                    <Row gutter={16}>
                        <div className='top-right-button'>
                            {getErrorInfo(error)}
                            <Button
                                htmlType='submit'
                                type='primary'
                                icon={<SaveFilled />}
                                className={styles.save}
                                loading={saveLoading}
                            >
                                <FormattedMessage id='account.profile.save' className={styles.icon} />
                            </Button>
                        </div>
                    </Row>
                    <Row gutter={16}>
                        <Col lg={6} md={12} sm={24}>
                            <Form.Item
                                label={fieldLabels.employeeId}
                                name='employeeId'
                            >
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col lg={6} md={12} sm={24}>
                            <Form.Item
                                label={fieldLabels.name}
                                name='name'
                                rules={[{ required: true, message: formatMessage({ id: 'account.profile.name.required' }) }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col lg={6} md={12} sm={24}>
                            <Form.Item
                                label={fieldLabels.age}
                                name='age'
                                rules={[{ required: true, message: formatMessage({ id: 'account.profile.age.required' }) }]}
                            >
                                <InputNumber min={18} max={100} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col lg={6} md={12} sm={24}>
                            <Form.Item
                                label={fieldLabels.gender}
                                name='gender'
                                rules={[{ required: true, message: formatMessage({ id: 'account.profile.gender.required' }) }]}
                            >
                                <Select>
                                    <Option value="male">
                                        <FormattedMessage id='dataanddictionary.gender.male' />
                                    </Option>
                                    <Option value="female">
                                        <FormattedMessage id='dataanddictionary.gender.female' />
                                    </Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col lg={6} md={12} sm={24}>
                            <Form.Item
                                label={fieldLabels.mobile}
                                name='mobile'
                            >
                                <Input placeholder={formatMessage({ id: 'account.profile.mobile.placeholder' })} />
                            </Form.Item>
                        </Col>
                        <Col lg={6} md={12} sm={24}>
                            <Form.Item
                                label={fieldLabels.email}
                                name='email'
                            >
                                <Input placeholder={formatMessage({ id: 'account.profile.email.placeholder' })} />
                            </Form.Item>
                        </Col>
                        <Col lg={6} md={12} sm={24}>
                            <Form.Item
                                label={fieldLabels.idNumber}
                                name='idNumber'
                            >
                                <Input placeholder={formatMessage({ id: 'account.profile.idNumber.placeholder' })} />
                            </Form.Item>
                        </Col>
                        <Col lg={6} md={12} sm={24}>
                            <Form.Item
                                label={fieldLabels.job}
                                name='job'
                            >
                                <Input placeholder={formatMessage({ id: 'account.profile.job.placeholder' })} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col lg={6} md={12} sm={24}>
                            <Form.Item
                                label={fieldLabels.address}
                                name='address'
                            >
                                <Cascader
                                    options={areaTree}
                                    placeholder={formatMessage({ id: 'account.profile.address.placeholder' })}
                                // onChange={handleCascader}
                                />
                            </Form.Item>
                        </Col>
                        <Col lg={12} md={12} sm={24}>
                            <Form.Item
                                // label={fieldLabels.addressDetail}
                                label={' '}
                                name='addressDetail'
                            >
                                <Input placeholder={formatMessage({ id: 'account.profile.addressDetail.placeholder' })} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col lg={6} md={12} sm={24}>
                            <Form.Item
                                label={fieldLabels.department}
                                name='department'
                                rules={[{ required: true, message: formatMessage({ id: 'account.profile.department.required' }) }]}
                            >
                                <Select>
                                    {departments.map(item => (
                                        <Option key={item.key} value={item.value}>
                                            {item.label}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col lg={12} md={12} sm={24}>
                            <Form.Item
                                label={fieldLabels.role}
                                name='role'
                                rules={[{ required: true, message: formatMessage({ id: 'account.profile.role.required' }) }]}
                            >
                                <Select mode="multiple">
                                    {roles.map(item => (
                                        <Option key={item.key} value={item.value}>
                                            {item.label}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>
            </PageHeaderWrapper>
        </Form> : null
    )
}

export default connect(({ user, loading }: {
    user: UserModelState, loading: {
        effects: {
            [key: string]: boolean
        }
    }
}) => (
        { currentUser: user.currentUser, saveLoading: loading.effects['user/changeProfile'] }
    ))(Profile)