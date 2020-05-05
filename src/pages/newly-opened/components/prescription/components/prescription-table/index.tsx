import React, { useState, useEffect, useRef, ReactText } from 'react'
import { Card, Button, Form, Table, message } from 'antd'
import { SettingFilled } from '@ant-design/icons'
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale'
import _ from 'loadsh'
import { Store } from 'rc-field-form/lib/interface'

import EditableCell from './EditableCell'
import getColumns from './columns'
import BatchSettingModal from './BatchSettingModal'
import { CurrentPrescriptionType, WesternMedicineTableDataType } from '../../../../data'

import styles from './index.less'


interface PrescriptionTableProps {
  currentPrescription: CurrentPrescriptionType; // 当前处方
  handleRemoveDrug: (key: number) => void;
}



const PrescriptionTable: React.FC<PrescriptionTableProps> = ({ currentPrescription, handleRemoveDrug }) => {

  const [form] = Form.useForm()
  // useState
  const [data, setData] = useState([]) // Table的data
  const [column, setColumn] = useState([]) // Table的columns
  const [editingKey, setEditingKey] = useState('') // 当前编辑药品的key
  const [batchSettingModalVisible, setBatchSettingModalVisible] = useState(false) //批量设置弹窗的显隐
  const [selectedRowKeys, setSelectedRowKeys] = useState<ReactText[]>([])

  // useRef
  // const selectedRowKeys = useRef<ReactText[]>([])

  // 更新data
  useEffect(() => {
    // 增加序号（作为删除处方中药品的索引）
    const currentPrescriptionData = currentPrescription.data.map((item: any, index: number) => ({
      ...item,
      key: index + 1
    }))
    setData(currentPrescriptionData)
  }, [currentPrescription])

  // 更新columns
  useEffect(() => {
    const params = { editingKey, edit, remove, save, cancel }
    const columns = getColumns(currentPrescription.type, params)
    setColumn(columns)
  }, [currentPrescription, editingKey])

  // 编辑
  const edit = (record: O) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  // 保存修改
  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields());

      const newData = _.cloneDeep(data);
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  // 取消编辑
  const cancel = () => {
    setEditingKey('');
  };

  // 删除
  const remove = (key: number) => {
    // 交给父组件进行处理
    handleRemoveDrug(key)
  }

  // 处理table多选
  const handleSelectChange = (keys: ReactText[]) => {
    setSelectedRowKeys(keys)
  }

  // 批量设置
  const handleBatchSetting = () => {
    if (selectedRowKeys.length) {
      // 已选择，弹出批量设置的弹出框
      setBatchSettingModalVisible(true)

    } else {
      // 未选择，提醒请选择
      message.warning(formatMessage({ id: 'newlyandopened.prescriptionandtable.pleaseSelectDrug' }))
    }

  }

  // 确定批量设置
  const handleBatchSettingOk = (values: Store) => {
    setBatchSettingModalVisible(false)
    // 将批量修改的值更新到data，由selectedRowKeys查找data中具体药品，进行数据合并
    let newData = _.cloneDeep(data)
    newData = newData.map((item: WesternMedicineTableDataType) => {
      const keyItem = selectedRowKeys.find(key => item.key === key)
      if (keyItem) {
        return {
          ...item,
          ...values
        }
      }
      return item
    })
    // 清空table中选中的选项
    setSelectedRowKeys([])
    setData(newData)
  }

  // 取消批量设置Modal
  const handleBatchSettingCancel = () => {
    setBatchSettingModalVisible(false)
  }

  const mergedColumns = column.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: O) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: record.key === editingKey,
      }),
    };
  });

  const batchSettingModalProps = {
    visible: batchSettingModalVisible,
    handleOk: handleBatchSettingOk,
    handleCancel: handleBatchSettingCancel
  }

  return (
    <Card
      className={styles.prescriptionTable}
      style={{ height: 600, marginBottom: 20 }}
      title='Rp'
      extra={currentPrescription.type === 10001800 && (
        <>
          <Button
            className={styles.setting}
            type="link"
            icon={<SettingFilled />}
            onClick={handleBatchSetting}
          >
            <FormattedMessage id='newlyandopened.prescriptionandtable.batchSetting' />
          </Button>
          <BatchSettingModal {...batchSettingModalProps} />
        </>
      )}
    >
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          dataSource={data}
          columns={mergedColumns}
          pagination={false}
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: selectedRowKeys,
            onChange: handleSelectChange
          }}
          scroll={{ x: 1500, y: 400 }}
        />
      </Form>
    </Card>
  )
}

export default PrescriptionTable