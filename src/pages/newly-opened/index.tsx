import React, { useState } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { Form, Card, Radio } from 'antd'
import { RadioChangeEvent } from 'antd/es/radio';
import { FormattedMessage } from 'umi-plugin-react/locale'
import { connect } from 'dva'
import { Dispatch } from 'redux'

import { patientManagementState, patientsType } from '@/pages/patient-management/data'
import PatientInformation from './components/PatientInformation'
import Prescription from './components/prescription'
import { DrugsModelState } from '@/models/drugs'

import styles from './index.less'


interface NewlyOpenedProps {
    patients: patientsType[];
    drugs: A<O>;
    dispatch: Dispatch
}

const NewlyOpened: React.FC<NewlyOpenedProps> = props => {
    const { patients, drugs, dispatch } = props
    const [form] = Form.useForm()

    const [buttonType, setButtonType] = useState('prescription')

    const handleChangeButtonType = (e: RadioChangeEvent) => {
        setButtonType(e.target.value)
    }

    const handleSelectPatient = (patientId: number) => {
        console.log('handleSelectPatient', patientId)
    }

    const PatientInformationProps = {
        patients,
        onChange: handleSelectPatient
    }

    const PrescriptionProps = {
        drugs,
        dispatch
    }
    return (
        <PageHeaderWrapper>
            <Form
                form={form}
                layout='vertical'
            >
                <Card
                    className={styles.card}
                    title={
                        <Radio.Group
                            className={styles.button}
                            value={buttonType}
                            onChange={handleChangeButtonType}
                        >
                            <Radio.Button key='prescription' value='prescription'>
                                <FormattedMessage id='newlyandopened.prescription' />
                            </Radio.Button>
                            <Radio.Button key='medicalRecord' value='medicalRecord'>
                                <FormattedMessage id='newlyandopened.medicalRecord' />
                            </Radio.Button>
                        </Radio.Group>
                    }
                >
                    <PatientInformation {...PatientInformationProps} />
                </Card>
                {buttonType === 'prescription' ? <Prescription  {...PrescriptionProps} /> : 'medicalRecord'}
            </Form>
        </PageHeaderWrapper>
    )
}

export default connect(({
    patients,
    drugs
}: {
    patients: patientManagementState;
    drugs: DrugsModelState
}) => ({
    patients: patients.patients,
    drugs: drugs.drugs
}))(NewlyOpened)