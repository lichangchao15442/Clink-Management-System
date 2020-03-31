import React from 'react'
import { Modal, Form, Row, Col, Select } from 'antd'
import { formatMessage } from 'umi-plugin-react/locale'

import { familyRelationships } from '@/utils/dataDictionary'
import { SearchPatient } from '@/components/CommonFields'

const FormItem = Form.Item
const { Option } = Select

const colProps = {
    lg: 12,
    md: 12,
    sm: 24
}

interface CreateFormProps {
    visible: boolean;
    handleAdd: (fields: any) => void;
    handleCancel: () => void;
    patients: any;
}

const CreateForm: React.FC<CreateFormProps> = ({ visible, handleAdd, handleCancel, patients }) => {
    const [form] = Form.useForm()

    const handleOk = async () => {
        const fieldsValue = await form.validateFields()
        form.resetFields()
        handleAdd(fieldsValue)
    }

    const onCancel = () => {
        form.resetFields()
        handleCancel()
    }

    return (
        <Modal
            className='modal-no-border'
            title={formatMessage({ id: 'commonandfields.addFamilyMember' })}
            visible={visible}
            onOk={handleOk}
            onCancel={onCancel}
        > 
            <Form
                form={form}
                layout='vertical'
            >
                <Row gutter={16}>
                    <Col {...colProps}>
                        <FormItem
                            label={formatMessage({ id: 'commonandfields.familyRelationship' })}
                            name="familyRelationship"
                            rules={[{ required: true, message: formatMessage({ id: 'commonandfields.familyRelationship.required' }) }]}
                        >
                            <Select placeholder={formatMessage({ id: 'commonandfields.pleaseSelect' })}>
                                {familyRelationships.map(item => <Option key={item.key} value={item.key}>{item.label}</Option>)}
                            </Select>
                        </FormItem>
                    </Col>
                    <SearchPatient patients={patients} newColProps={colProps} />
                </Row>
            </Form>
        </Modal >
    )
}

export default CreateForm