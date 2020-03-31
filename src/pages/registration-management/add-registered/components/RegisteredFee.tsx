import React from 'react'
import { Modal, Form, Row, Col, Input, InputNumber, Radio } from 'antd'
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale'

import { paymentMethods } from '@/utils/dataDictionary'

import styles from './RegisteredFee.less'

const FormItem = Form.Item

interface RegisteredFeeProps {
    visible: boolean;
    onOk: () => void;
    onCancel: () => void;
    handleDiscountedPrice: (value?: number) => void;
    handleDiscount: (value?: number) => void;
    handleMedicarePayment: (value?: number) => void;
    discount: number;
    discountedPrice: number;
    actualMoney: number;
}

const RegisteredFee: React.FC<RegisteredFeeProps> = props => {
    const {
        visible,
        onOk,
        onCancel,
        handleDiscountedPrice,
        handleDiscount,
        handleMedicarePayment,
        discount = 1,
        discountedPrice = 0,
        actualMoney,
    } = props
    const [form] = Form.useForm()

    const initialValues = {
        paymentMethod: paymentMethods[0].key
    }

    const handleOk = () => {
        onOk()
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
                <span className={styles.money}>150.00</span>
            </div>
            <Form
                form={form}
                initialValues={initialValues}
                wrapperCol={{ span: 18 }}
            >
                <Row gutter={16}>
                    <Col span={14}>
                        <FormItem
                            name="discountedPrice"
                            label={formatMessage({ id: 'registrationandmanagement.addandregistered.discountedPrice' })}
                        >
                            <InputNumber
                                style={{ width: '80%' }}
                                onChange={handleDiscountedPrice}
                                value={Number(discountedPrice.toFixed(2))}
                                min={0}
                                step={0.01}
                            />
                            <span className="ant-form-text">{formatMessage({ id: 'registrationandmanagement.addandregistered.feeUnit' })}</span>
                        </FormItem>
                    </Col>
                    <Col span={10}>
                        <FormItem
                            name="discount"
                            label={formatMessage({ id: 'registrationandmanagement.addandregistered.discount' })}
                        >
                            <InputNumber
                                style={{ width: '50%' }}
                                max={10}
                                step={0.01}
                                onChange={handleDiscount}
                                value={Number(discount.toFixed(2))}
                            />
                            <span className="ant-form-text">{formatMessage({ id: 'registrationandmanagement.addandregistered.discountUnit' })}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={14}>
                        <FormItem
                            name="medicarePayment"
                            label={formatMessage({ id: 'registrationandmanagement.addandregistered.medicarePayment' })}
                        >
                            <InputNumber style={{ width: '80%' }} step={0.01} onChange={handleMedicarePayment} />
                            <span className="ant-form-text">{formatMessage({ id: 'registrationandmanagement.addandregistered.feeUnit' })}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={14}>
                        <FormItem
                            name="actualMoney"
                            label={formatMessage({ id: 'registrationandmanagement.addandregistered.actualMoney' })}
                        >
                            <InputNumber style={{ width: '80%' }} value={actualMoney} />
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