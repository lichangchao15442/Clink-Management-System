import React, { useState, useEffect } from 'react'
import { Card, Button, Form, Table, Popconfirm } from 'antd'
import { SettingFilled, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale'
import _ from 'loadsh'

import EditableCell from './EditableCell'
import getColumns from './columns'
import { CurrentPrescriptionType } from '../../../../data'

import styles from './index.less'


interface PrescriptionTableProps {
  currentPrescription: CurrentPrescriptionType;
}



const PrescriptionTable: React.FC<PrescriptionTableProps> = ({ currentPrescription }) => {
  // const initColumns = getColumns(currentPrescription.type)

  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [column, setColumn] = useState([])
  const [editingKey, setEditingKey] = useState('')
  const [handle, setHandle] = useState({ type: '', key: 0 })

  // 更新data
  useEffect(() => {
    setData(currentPrescription.data)
  }, [currentPrescription])

  // 更新columns
  useEffect(() => {
    const params = { editingKey, edit, remove, save, cancel }
    const columns = getColumns(currentPrescription.type, params)
    setColumn(columns)
  }, [currentPrescription, editingKey])

  // 处理事件处理程序bug（比如onClick中只能取到上一次data值的bug）
  useEffect(() => {
    if (handle.type) {
      const { type, key } = handle
      if (type === 'remove') {
        // 删除操作
        const newData = [...data]
        newData.splice(key - 1, 1)
        newData.forEach((item, index) => { item.key = index + 1 })
        setData(newData)
      }
    }
  }, [handle])

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

  const remove = (key: number) => {
    // TODO: bug:在事件处理程序中关于data，只能获取到上一次的值！
    // 错误定位：未知
    // 解决方法：设置一个事件处理函数的开关，通过state告知该事件处理韩式的功能和参数
    setHandle({ type: 'remove', key })

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

  return (
    <Card
      className={styles.prescriptionTable}
      style={{ height: 600, marginBottom: 20 }}
      title='Rp'
      extra={(
        <Button className={styles.setting} type="link" icon={<SettingFilled />}>
          <FormattedMessage id='newlyandopened.prescriptionandtable.batchSetting' />
        </Button>
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
            type: 'checkbox'
          }}
          scroll={{ x: 1500, y: 400 }}
        />
      </Form>
    </Card>
  )
}

export default PrescriptionTable