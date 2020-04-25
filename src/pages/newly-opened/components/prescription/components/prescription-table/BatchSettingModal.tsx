import React from 'react'
import { Modal, Table, Form } from 'antd'
import { formatMessage } from 'umi-plugin-react/locale'
import { Store } from 'rc-field-form/lib/interface'

import { usages, frequencies } from '@/utils/dataDictionary'
import EditableCell from './EditableCell'
import styles from './BatchSettingModal.less'

interface BatchSettingModalProps {
  visible: boolean;
  handleOk: (values: Store) => void;
  handleCancel: () => void;
}

const columns = [
  {
    title: formatMessage({ id: 'newlyandopened.prescriptionandtable.groupNumber' }),
    dataIndex: 'groupNumber'
  },
  {
    title: formatMessage({ id: 'newlyandopened.prescriptionandtable.singleUsage' }),
    dataIndex: 'singleUsage'
  },
  {
    title: formatMessage({ id: 'newlyandopened.prescriptionandtable.usage' }),
    dataIndex: 'usage'
  },
  {
    title: formatMessage({ id: 'newlyandopened.prescriptionandtable.frequency' }),
    dataIndex: 'frequency'
  },
  {
    title: formatMessage({ id: 'newlyandopened.prescriptionandtable.days' }),
    dataIndex: 'days'
  },
  {
    title: formatMessage({ id: 'newlyandopened.prescriptionandtable.total' }),
    dataIndex: 'total'
  },
]

const data = [
  {
    key: 1,
    groupNumber: 1,
    singleUsage: 1,
    usage: usages[0].key,
    frequency: frequencies[0].key,
    days: 1,
    total: 1
  }
]

const BatchSettingModal: React.FC<BatchSettingModalProps> = ({ visible, handleOk, handleCancel }) => {

  const [form] = Form.useForm()

  const mergedColumns = columns.map(col => {
    return {
      ...col,
      onCell: (record: O) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: true,
      }),
    }
  })

  const onOK = async () => {
    // 1. 将表单收集到的值传递给父组件
    const values = await form.getFieldsValue()
    handleOk(values)
    // 2. 清空表单值
    form.resetFields()
  }

  const onCancel = () => {
    // 1. 清空modal表单值
    form.resetFields()
    handleCancel()
  }
  return (
    <Modal
      title="批量设置药品信息"
      className={styles.batchSettingModal}
      width={1000}
      visible={visible}
      onOk={onOK}
      onCancel={onCancel}
    >
      <Form
        form={form}
        component={false}
        initialValues={data[0]}
      >
        <Table
          columns={mergedColumns}
          dataSource={data}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          rowKey={(record) => record.key}
          pagination={false}
        />
      </Form>
    </Modal>
  )
}

export default BatchSettingModal