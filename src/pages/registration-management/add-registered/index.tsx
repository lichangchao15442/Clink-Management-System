import React, { useEffect, useState, useRef } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { Card, Button, Form } from 'antd'
import { PayCircleFilled } from '@ant-design/icons'
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale'
import { connect } from 'dva'
import moment from 'moment'
import { Dispatch } from 'redux'

import { randomNumber } from '@/utils/utils'
import { ageUnits } from '@/utils/dataDictionary'
import RegisteredInfo from './components/RegisteredInfo'
import PatientInfo from './components/PatientInfo'
import RegisteredFee from './components/RegisteredFee'
import { StateType } from './data'
import { patientManagementState } from '../../patient-management/data'

import styles from './index.less'


interface AddRegisteredProps {
    dispatch: Dispatch;
    addRegistered: StateType;
    patients: patientManagementState;
    loading: {
        effects: {
            [key: string]: boolean
        }
    }
}


// const registeredDate = moment().format('YYYY-MM-DD')

const AddRegistered: React.FC<AddRegisteredProps> = props => {
    const [form] = Form.useForm()
    const { setFieldsValue } = form
    const { addRegistered, patients, loading } = props
    const { doctors } = addRegistered
    const { patients: Patients } = patients
    const [visible, setVisible] = useState(false)
    const total = useRef(150)
    const [discount, setDiscount] = useState(10)
    const [discountedPrice, setDiscountedPrice] = useState(0)
    const [medicarePayment, setMedicarePayment] = useState(0)
    const [actualMoney, setActualMoney] = useState(total.current)

    const initialValues = {
        registeredNumber: randomNumber(),
        registeredDate: moment().format('YYYY-MM-DD'),
        registrar: localStorage.getItem('currentUserName')
    }

    const clearModalValues = () => {
        setDiscount(10)
        setDiscountedPrice(0)
        setMedicarePayment(0)
        setActualMoney(total.current)
    }

    useEffect(() => {
        const money = total.current - discountedPrice - medicarePayment
        setActualMoney(Number(money.toFixed(2)))
    }, [discountedPrice, medicarePayment])

    // 处理patients数据
    const newPatients = Patients && Patients.map(item => {
        const gender = item.gender === 0 ? formatMessage({ id: 'dataanddictionary.gender.male' }) : formatMessage({ id: 'dataanddictionary.gender.female' })
        const ageUnitItem = ageUnits.find(_ => _.key === item.ageUnit)
        const ageUnit = ageUnitItem && ageUnitItem.label
        const ageAndAgeUnit = `${item.age}${ageUnit}`
        return {
            ...item,
            gender,
            ageAndAgeUnit
        }
    })

    // 选择患者，自动绑定信息
    const handleSelectPatient = (value: number) => {
        const patient = newPatients.find(_ => _.id === value)
        if (patient) {
            const ageUnitItem = ageUnits.find(_ => _.key === patient.ageUnit)
            patient.ageUnit = ageUnitItem && ageUnitItem.key
            patient.birthday = moment(patient.birthday)
            setFieldsValue(patient)
        }
    }

    // 手动处理优惠金额，改变折扣
    const handleDiscountedPrice = (value?: number) => {
        const newValue = Number(value)
        if (newValue) {
            setDiscountedPrice(newValue)
            setDiscount((1 - (newValue / total.current)) * 10)
        } else {
            setDiscountedPrice(0)
            setDiscount(10)
        }

    }

    // 手动处理折扣，改变优惠金额
    const handleDiscount = (value?: number) => {
        const newValue = Number(value)
        if (newValue) {
            setDiscount(newValue)
            setDiscountedPrice(total.current * (10 - newValue) / 10)
        } else {
            setDiscount(10)
            setDiscountedPrice(0)
        }
    }

    // 即使获取medicarePayment用于实收金额的计算
    const handleMedicarePayment = (value?: number) => {
        const newValue = Number(value)
        if (newValue) {
            setMedicarePayment(newValue)
        } else {
            setMedicarePayment(0)
        }
    }

    const onFinish = () => {
        setVisible(true)

    }

    const onOk = () => {
        setVisible(false)
        clearModalValues()
    }

    const onCancel = () => {
        setVisible(false)
        clearModalValues()
    }

    const RegisteredInfoProps = {
        doctors,
        loading: loading.effects['addRegistered/fetchCurrentUser']
    }

    const PatientInfoProps = {
        patients: newPatients,
        handleSelectPatient
    }

    const RegisteredFeeProps = {
        visible,
        onOk,
        onCancel,
        handleDiscountedPrice,
        handleDiscount,
        handleMedicarePayment,
        discount,
        discountedPrice,
        actualMoney,
    }

    return (
        <Form
            form={form}
            layout='vertical'
            initialValues={initialValues}
            onFinish={onFinish}
        >
            <PageHeaderWrapper>
                <Card
                    className={styles.main}
                    extra={
                        <div className='top-right-button'>
                            <Button
                                className={styles.btn}
                                icon={<PayCircleFilled className={styles.icon} />}
                                htmlType='submit'
                            >
                                <FormattedMessage id='registrationandmanagement.addandregistered.toll' />
                            </Button>
                        </div>
                    }
                >
                    <RegisteredInfo {...RegisteredInfoProps} />
                    <PatientInfo {...PatientInfoProps} />
                    <RegisteredFee {...RegisteredFeeProps} />
                </Card>
            </PageHeaderWrapper>
        </Form>
    )
}

export default connect(({ addRegistered, patients, loading }:
    {
        addRegistered: StateType,
        patients: patientManagementState,
        loading: {
            effects: {
                [key: string]: boolean
            }
        }
    }) => ({ addRegistered, patients, loading }))
    (AddRegistered)
