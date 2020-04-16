import React, { useEffect } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { Card, Button, Form } from 'antd'
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale'
import { SaveFilled, WalletFilled, CaretLeftFilled, ExclamationCircleFilled } from '@ant-design/icons'
import { router } from 'umi'
import { connect } from 'dva'
import moment from 'moment'
import { Dispatch } from 'redux'
import { Store } from 'rc-field-form/es/interface';


import { DoctorsType, DoctorsStateType } from '@/models/doctors'
import { patientManagementState, patientsType } from '@/pages/patient-management/data'
import { registrationFeeOptions, medicalFeeOptions } from '@/utils/dataDictionary'
import ModalConfirm from '@/components/ModalConfirm'
import RegisteredInformation from './components/registered-information'
import OrderInformation from './components/OrderInformation'
import PatientInformation from './components/PatientInformation'
import { EditRegisterStateType } from './data'

import styles from './index.less'

const { RegisInfoOfPending, RegisInfoOfOthers } = RegisteredInformation

interface EditRegisterProps {
    editRegister: EditRegisterStateType;
    doctors: DoctorsType[];
    patients: patientsType[];
    loading: {
        effects: {
            [key: string]: boolean
        }
    };
    dispatch: Dispatch;
    location: {
        query: any
    }
}

const EditRegister: React.FC<EditRegisterProps> = props => {
    const [form] = Form.useForm()
    const { editRegister, doctors, patients, loading, dispatch, location } = props
    const { registeredInformation } = editRegister
    const { attendanceStatus } = registeredInformation
    const { query } = location

    const registrationFeeOption = registrationFeeOptions.find(_ => _.key === registeredInformation.registrationFee)
    const medicalFeeOption = medicalFeeOptions.find(_ => _.key === registeredInformation.medicalFee)
    const initialValue = {
        ...registeredInformation,
        registrationFee: registrationFeeOption?.label,
        medicalFee: medicalFeeOption?.label,
        name: registeredInformation.id,
        birthday: moment(registeredInformation.birthday),
        address: registeredInformation.address?.split(' '),
    }

    useEffect(() => {
        // 注意：没有使用Form的初始值initialValues，是因为在第一次渲染页面时registeredInformation为{}
        const { setFieldsValue } = form
        setFieldsValue(initialValue)
    }, [initialValue])


    const onFinish = (fields: Store) => {
        const newFields = { ...fields }
        newFields.registeredNumber = Number(query.registeredNumber)
        if (attendanceStatus === 10001500) {
            newFields.doctorName = doctors.find(_ => _.id === newFields.doctorId)?.name
            delete newFields.registrationFee
            delete newFields.medicalFee
        }
        newFields.birthday = moment(newFields.birthday).format('YYYY-MM-DD')
        newFields.address = typeof fields.address === 'object' ? fields.address.join(' ') : ''
        newFields.operationType = 'edit'
        dispatch({
            type: 'editRegister/submit',
            payload: newFields
        })
    }

    const resign = () => {
        const title = formatMessage({ id: 'registrationandmanagement.editandregister.resign.completeConfirmation' })
        const content = <span>
            <ExclamationCircleFilled style={{ color: '#FFD149', fontSize: 16, marginRight: 10 }} />
            {formatMessage({ id: 'registrationandmanagement.editandregister.resign.modalContent' })}
        </span>
        const onOk = async () => {
            const registeredNumber = Number(query.registeredNumber)
            const refundDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
            const { actualMoney } = registeredInformation
            await dispatch({
                type: 'editRegister/submit',
                payload: {
                    registeredNumber,
                    refundDate,
                    refundAmount: Number(actualMoney),
                    attendanceStatus: 10001502,
                    operationType: 'resign'
                }
            })
            router.push('/registration-management/registered-record')
        }
        ModalConfirm({ title, content, onOk })
    }

    const OrderInformationProps = {
        data: registeredInformation,
        loading: loading.effects['editRegister/fetch'],
        attendanceStatus
    }

    const RegisInfoOfPendingProps = {
        doctors
    }

    const RegisInfoOfOthersProps = {
        data: registeredInformation,
        loading: loading.effects['editRegister/fetch']
    }

    const PatientInformationProps = {
        patients
    }
    return (
        <Form
            form={form}
            layout='vertical'
            onFinish={onFinish}
        >
            <PageHeaderWrapper>
                <Card
                    className={styles.main}
                    title={
                        <div className='title-decoration'>
                            {attendanceStatus === 10001500 ?
                                <FormattedMessage id='registrationandmanagement.editandregister.editRegisteredInformation' /> :
                                <FormattedMessage id='registrationandmanagement.editandregister.viewRegisteredInformation' />
                            }
                        </div>
                    }
                    extra={
                        <div className='top-right-button'>
                            <Button
                                style={{ marginRight: 10 }}
                                type='primary'
                                icon={<SaveFilled />}
                                // loading={loading.effects['editRegister/submit']}
                                htmlType='submit'
                            >
                                <FormattedMessage id='commonandfields.save' />
                            </Button>
                            {attendanceStatus === 10001500 &&
                                <Button
                                    style={{ marginRight: 10 }}
                                    type='primary'
                                    ghost
                                    icon={<WalletFilled />}
                                    onClick={resign}
                                >
                                    <FormattedMessage id='commonandfields.resign' />
                                </Button>
                            }
                            <Button
                                type='primary'
                                ghost
                                icon={<CaretLeftFilled />}
                                onClick={() => router.goBack()}
                            >
                                <FormattedMessage id='commonandfields.goBack' />
                            </Button>
                        </div>
                    }
                >
                    <OrderInformation {...OrderInformationProps} />
                    {attendanceStatus === 10001500 ?
                        <RegisInfoOfPending {...RegisInfoOfPendingProps} /> :
                        <RegisInfoOfOthers {...RegisInfoOfOthersProps} />
                    }
                    <PatientInformation {...PatientInformationProps} />
                </Card>
            </PageHeaderWrapper>
        </Form>
    )
}

export default connect(({ editRegister, doctors, patients, loading }:
    {
        editRegister: EditRegisterStateType;
        doctors: DoctorsStateType;
        patients: patientManagementState;
        loading: {
            effects: {
                [key: string]: boolean;
            }
        }
    }) => ({
        editRegister,
        doctors: doctors.doctors,
        patients: patients.patients,
        loading
    }))(EditRegister)