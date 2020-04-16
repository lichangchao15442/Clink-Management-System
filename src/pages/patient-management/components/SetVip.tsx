import React, { useState } from 'react'
import { Modal, DatePicker, Checkbox, Table, Form, Row, Col, Input } from 'antd'
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale'
import classnames from 'classnames'
import { vipLevels } from '@/utils/dataDictionary'
import { newPatientsType } from '../data'


import styles from './SetVip.less'

interface SetVipProps {
    visible: boolean;
    onOk: (formValues: any) => void;
    onCancel: () => void;
    rowSelection: {};
    values: newPatientsType;
}

const columns = [
    {
        title: formatMessage({ id: 'commonandfields.vipLevel' }),
        dataIndex: 'vipLevel',
        render: (text: string) => <span className={styles.vipLevel}>{text}</span>,
        align: 'center'
    },
    {
        title: formatMessage({ id: 'commonandfields.vipName' }),
        dataIndex: 'label',
        align: 'center'
    },
    {
        title: formatMessage({ id: 'commonandfields.vipDiscount' }),
        dataIndex: 'discount',
        align: 'center'
    },
];

interface changedValuesType {
    expireDate?: any;
    neverExpires?: boolean
}

const SetVip: React.FC<SetVipProps> = props => {
    const {
        visible,
        onOk,
        onCancel,
        rowSelection,
        values
    } = props

    const [form] = Form.useForm()
    const [datePickDisable, setDatePickDisable] = useState(false)

    const data = vipLevels.filter(_ => _.value !== 0)
    const newData = data.map(item => ({
        ...item,
        vipLevel: `vip${item.value}`,
        discount: item.discount.toFixed(2)
    }))

    const onValuesChange = (changedValues: changedValuesType) => {
        if (changedValues.hasOwnProperty('neverExpires')) {
            if (changedValues.neverExpires) {
                setDatePickDisable(true)
            } else {
                setDatePickDisable(false)
            }
        }
    }

    const handleCancel = () => {
        onCancel()
        setDatePickDisable(false)
        form.resetFields()
    }

    const handleOk = async () => {
        const formValues = await form.getFieldsValue()
        await onOk(formValues)
        setDatePickDisable(false)
        form.resetFields()
    }

    return (
        <Modal
            className={classnames('modal-no-border', styles.main)}
            title={formatMessage({ id: 'patientandmanagement.setVipLevel' })}
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Form
                form={form}
                initialValues={
                    {
                        vipCardNumber: values.vipCardNumber,
                        name: values.name
                    }
                }
                onValuesChange={onValuesChange}
            >
                <Row gutter={16}>
                    <Col span={16}>
                        <Form.Item
                            label={formatMessage({ id: 'commonandfields.vipCardNumber' })}
                            name='vipCardNumber'
                        >
                            <Input className={styles.noBorder} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label={formatMessage({ id: 'commonandfields.vipName' })}
                            name='name'
                            wrapperCol={{ span: 12 }}
                        >
                            <Input className={styles.noBorder} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={16}>
                        <Form.Item
                            label={formatMessage({ id: 'commonandfields.expireDate' })}
                            name='expireDate'
                        >
                            <DatePicker
                                style={{ width: 200 }}
                                disabled={datePickDisable}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name='neverExpires'
                            valuePropName="checked"
                        >
                            <Checkbox>
                                <FormattedMessage id='commonandfields.neverExpires' />
                            </Checkbox>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Table
                rowSelection={{
                    type: 'radio',
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={newData}
                pagination={false}
                size='small'
                bordered
            />
        </Modal >
    )
}

export default SetVip