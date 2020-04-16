import React, { useState } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { Card, Button, Form } from 'antd'
import { PayCircleFilled } from '@ant-design/icons'
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale'
import { connect } from 'dva'
import moment from 'moment'
import { Dispatch } from 'redux'

import { randomNumber } from '@/utils/utils'
import { ageUnits, registrationFeeOptions, medicalFeeOptions } from '@/utils/dataDictionary'
import { DoctorsStateType, DoctorsType } from '@/models/doctors'
import RegisteredInfo from './components/RegisteredInfo'
import PatientInfo from './components/PatientInfo'
import RegisteredFee from './components/RegisteredFee'
import { AddRegisteredFieldsType, RegisteredFeeFieldsType } from './data'
import { patientManagementState } from '../../patient-management/data'

import styles from './index.less'


interface AddRegisteredProps {
    dispatch: Dispatch;
    patients: patientManagementState;
    doctors: DoctorsType[];
    loading: {
        effects: {
            [key: string]: boolean
        }
    }
}



const AddRegistered: React.FC<AddRegisteredProps> = props => {
    const [form] = Form.useForm()
    const { setFieldsValue } = form
    const { patients, loading, doctors, dispatch } = props
    const { patients: Patients } = patients
    const [visible, setVisible] = useState(false)
    const [amountReceivable, setAmountReceivable] = useState(0)

    const initialValues = {
        registeredNumber: randomNumber(),
        registeredDate: moment().format('YYYY-MM-DD'),
        registrar: localStorage.getItem('currentUserName')
    }


    // 处理patients数据
    const newPatients = Patients && Patients.map(item => {
        const gender = item.gender === 0 ? formatMessage({ id: 'dataanddictionary.gender.male' }) : formatMessage({ id: 'dataanddictionary.gender.female' })
        const ageUnitItem = ageUnits.find(_ => _.key === item.ageUnit)
        const ageUnit = ageUnitItem && ageUnitItem.label
        const ageAndAgeUnit = `${item.age}${ageUnit}`
        return {
            ...item,
            genderText: gender,
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

    const onFinish = (fields: AddRegisteredFieldsType) => {
        const registrationFeeItem = registrationFeeOptions.find(_ => _.key === fields.registrationFee)
        const medicalFeeItem = medicalFeeOptions.find(_ => _.key === fields.medicalFee)
        const fee = medicalFeeItem ? registrationFeeItem!.value + medicalFeeItem.value : registrationFeeItem!.value
        setAmountReceivable(fee)
        setVisible(true)
    }

    const onOk = async (feeValues: RegisteredFeeFieldsType) => {
        const registeredPatientValues = await form.getFieldsValue()
        // 数据处理
        registeredPatientValues.doctorName = doctors.find(_ => _.id === registeredPatientValues.doctorId)!.name
        registeredPatientValues.patientName = Patients.find(_ => _.id === registeredPatientValues.id)!.name
        registeredPatientValues.birthday = moment(registeredPatientValues.birthday).format('YYYY-MM-DD')
        registeredPatientValues.attendanceStatus = 10001500
        registeredPatientValues.amountReceivable = amountReceivable
        registeredPatientValues.actualMoney = feeValues.actualMoney
        registeredPatientValues.discountedPrice = feeValues.discountedPrice
        registeredPatientValues.medicarePayment = feeValues.medicarePayment
        registeredPatientValues.paymentMethod = feeValues.paymentMethod
        registeredPatientValues.address = registeredPatientValues.address?.join(' ')
        registeredPatientValues.chargeDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
        await dispatch({
            type: 'addRegistered/add',
            payload: registeredPatientValues
        })
        form.resetFields()
        setVisible(false)
    }

    const onCancel = () => {
        setVisible(false)
    }

    const RegisteredInfoProps = {
        doctors
    }

    const PatientInfoProps = {
        patients: newPatients,
        handleSelectPatient
    }

    const RegisteredFeeProps = {
        visible,
        confirmLoading: loading.effects['addRegistered/add'],
        amountReceivable,
        onOk,
        onCancel,
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

export default connect(({ patients, doctors, loading }:
    {
        patients: patientManagementState,
        doctors: DoctorsStateType,
        loading: {
            effects: {
                [key: string]: boolean
            }
        }
    }) => ({ patients, doctors: doctors.doctors, loading }))
    (AddRegistered)
