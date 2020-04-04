import React, { useRef } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { Card, Button, Form } from 'antd'
import { FormattedMessage } from 'umi-plugin-react/locale'
import { SaveFilled, CaretLeftFilled } from '@ant-design/icons'
import { connect } from 'dva'
import { router } from 'umi'
import { Dispatch } from 'redux'
import moment from 'moment'
import { ageUnits } from '@/utils/dataDictionary'
import BasicInformation from './components/basic-information'
import AssociateFamilyMember from './components/associate-family-member'

import styles from './index.less'

interface AddPatientProps {
    dispatch: Dispatch<any>;
    loading: boolean;
}

const AddPatient: React.FC<AddPatientProps> = props => {
    const { dispatch, loading } = props
    const [form] = Form.useForm()
    const familyMembers = useRef(null)

    const onFinish = (fields: any) => {
        const newFields = { ...fields }
        newFields.birthday = fields.birthday && moment(fields.birthday).format('YYYY-MM-DD HH:mm:ss')
        newFields.expireDate = fields.expireDate && moment(fields.expireDate).format('YYYY-MM-DD HH:mm:ss')
        newFields.ageUnit = fields.ageUnit || ageUnits[ageUnits.length - 1].key
        newFields.familyMembers = familyMembers.current
        newFields.createTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        newFields.operator = localStorage.getItem('currentUserName')
        newFields.address = newFields.address.join(' ')
        dispatch({
            type: 'patientManagement/addPatient',
            payload: newFields
        })
    }

    const getFamilyData = (family: any) => {
        familyMembers.current = family
    }

    return (
        <Form
            form={form}
            layout='vertical'
            onFinish={onFinish}
        // initialValues={initialValues}
        >
            <PageHeaderWrapper>
                <Card
                    className={styles.main}
                    title={
                        <div className='title-decoration'><FormattedMessage id='patientandmanagement.addandpatient.title' /></div>
                    }
                    extra={
                        <div className='top-right-button'>
                            <Button
                                style={{ marginRight: 10 }}
                                type='primary'
                                icon={<SaveFilled />}
                                loading={loading}
                                htmlType='submit'
                            >
                                <FormattedMessage id='commonandfields.save' />
                            </Button>
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
                    <BasicInformation />
                    <AssociateFamilyMember getFamilyData={getFamilyData} />
                </Card>
            </PageHeaderWrapper >
        </Form>
    )
}

export default connect(({ loading }: {
    loading: {
        effects: {
            [key: string]: boolean
        }
    }
}) => ({
    loading: loading.effects['patientManagement/addPatient']
}))(AddPatient)