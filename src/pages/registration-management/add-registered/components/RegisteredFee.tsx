import React from 'react'
import { Modal, Form, Row, Col, Input, InputNumber, Radio } from 'antd'
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale'

import { paymentMethods } from '@/utils/dataDictionary'
import { RegisteredFeeFieldsType } from '../data'

import styles from './RegisteredFee.less'

const FormItem = Form.Item

interface RegisteredFeeProps {
    visible: boolean;
    amountReceivable: number;
    onOk: (formValues: RegisteredFeeFieldsType) => void;
    onCancel: () => void;
}

const RegisteredFee: React.FC<RegisteredFeeProps> = props => {
    const {
        visible,
        amountReceivable,
        onOk,
        onCancel,
    } = props
    const [form] = Form.useForm()

    const initialValues = {
        paymentMethod: paymentMethods[0].key,
        actualMoney: amountReceivable
    }

    const InputNumberProps = {
        min: 0,
        max: amountReceivable,
        step: 0.01
    }

    const onValuesChange = (changedValues: RegisteredFeeFieldsType, allValues: RegisteredFeeFieldsType) => {
        const { setFieldsValue } = form

        if (changedValues.hasOwnProperty('discountedPrice') || changedValues.hasOwnProperty('discount')) {
            let discountedPrice
            let discount

            if (changedValues.hasOwnProperty('discountedPrice')) {
                // 根据优惠金额计算折扣和实付金额
                discountedPrice = Number(changedValues.discountedPrice)
                discount = (1 - (discountedPrice / amountReceivable)) * 10
            } else {
                // 根据折扣计算优惠金额和实付金额
                discount = Number(changedValues.discount)
                discountedPrice = amountReceivable * (10 - discount) / 10
            }
            const medicarePayment = allValues.medicarePayment ? allValues.medicarePayment : 0
            let actualMoney = amountReceivable - discountedPrice - medicarePayment
            actualMoney = actualMoney < 0 ? 0 : actualMoney
            setFieldsValue({
                discount: Number(discount.toFixed(2)),
                discountedPrice: Number(discountedPrice.toFixed(2)),
                actualMoney: Number(actualMoney.toFixed(2))
            })
        }
        if (changedValues.hasOwnProperty('medicarePayment')) {
            const medicarePayment = Number(changedValues.medicarePayment)
            const discountedPrice = allValues.discountedPrice ? allValues.discountedPrice : 0
            let actualMoney = amountReceivable - discountedPrice - medicarePayment
            actualMoney = actualMoney < 0 ? 0 : actualMoney
            setFieldsValue({
                actualMoney: Number(actualMoney.toFixed(2))
            })
        }
    }

    const handleOk = async () => {
        const formValues = await form.getFieldsValue()
        await onOk(formValues)
        form.resetFields()
    }

    const handleCancel = () => {
        onCancel()
        form.resetFields()
    }
    return (
        <Modal
            className='modal-no-border'
            width={680}
            title={formatMessage({ id: 'commonandfields.fee' })}
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <div className={styles.fee}>
                <span className={styles.amountReceivable}><FormattedMessage id='registrationandmanagement.addandregistered.amountReceivable' /></span>
                <span className={styles.money}>{amountReceivable.toFixed(2)}</span>
            </div>
            <Form
                form={form}
                initialValues={initialValues}
                wrapperCol={{ span: 18 }}
                onValuesChange={onValuesChange}
            >
                <Row gutter={16}>
                    <Col span={14}>
                        <FormItem
                            label={formatMessage({ id: 'registrationandmanagement.addandregistered.discountedPrice' })}
                        >
                            <FormItem
                                name="discountedPrice"
                                noStyle
                            >
                                <InputNumber style={{ width: '80%' }} {...InputNumberProps} />
                            </FormItem>
                            <span className="ant-form-text">{formatMessage({ id: 'registrationandmanagement.addandregistered.feeUnit' })}</span>
                        </FormItem>
                    </Col>
                    <Col span={10}>
                        <FormItem
                            label={formatMessage({ id: 'registrationandmanagement.addandregistered.discount' })}
                        >
                            <FormItem
                                name="discount"
                                noStyle
                            >
                                <InputNumber
                                    style={{ width: '50%' }}
                                    max={10}
                                    min={0}
                                    step={0.01}
                                />
                            </FormItem>
                            <span className="ant-form-text">{formatMessage({ id: 'registrationandmanagement.addandregistered.discountUnit' })}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={14}>
                        <FormItem
                            label={formatMessage({ id: 'registrationandmanagement.addandregistered.medicarePayment' })}
                        >
                            <FormItem
                                name="medicarePayment"
                                noStyle
                            >
                                <InputNumber style={{ width: '80%' }} {...InputNumberProps} />
                            </FormItem>
                            <span className="ant-form-text">{formatMessage({ id: 'registrationandmanagement.addandregistered.feeUnit' })}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={14}>
                        <FormItem
                            label={formatMessage({ id: 'registrationandmanagement.addandregistered.actualMoney' })}
                        >
                            <FormItem
                                name="actualMoney"
                                noStyle
                            >
                                <InputNumber
                                    className={styles.actualMoney}
                                    style={{ width: '80%' }}
                                    {...InputNumberProps}
                                />
                            </FormItem>
                            <span className="ant-form-text">{formatMessage({ id: 'registrationandmanagement.addandregistered.feeUnit' })}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <FormItem
                            label={formatMessage({ id: 'registrationandmanagement.addandregistered.paymentMethod' })}
                            name="paymentMethod"
                            wrapperCol={{ span: 20 }}
                        >
                            <Radio.Group>
                                {paymentMethods.map(item => (<Radio key={item.key} value={item.key}>{item.label}</Radio>))}
                            </Radio.Group>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={14}>
                        <FormItem
                            label={formatMessage({ id: 'registrationandmanagement.addandregistered.collectionNote' })}
                            name="collectionNote"
                        >
                            <Input style={{ width: '80%' }} />
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

export default RegisteredFee