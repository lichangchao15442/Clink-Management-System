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
  const initColumns = getColumns(currentPrescription.type)

  const [form] = Form.useForm()
  const [data, setData] = useState(currentPrescription.data)
  const [column, setColumn] = useState(initColumns)
  const [editingKey, setEditingKey] = useState('')
  console.log('PrescriptionTable_currentPrescription', currentPrescription)
  // setInterval(() => { console.log('data', data) }, 5000)

  useEffect(() => {
    setData(currentPrescription.data)
    console.log('currentPrescription')
    // 注意：如果直接在useEffect外面并不使用useState修改columns的值，会出现columns与originData更新不同步的问题
    // 也就会导致table中的render属性值，直接导致报错
    // 解决方法：在setData(originData)后面setColumn(newColumn)
    const columns = getColumns(currentPrescription.type)
    const newColumn = [...columns]
    newColumn.push(operation)
    setColumn(newColumn)
  }, [currentPrescription])

  const cancel = () => {
    setEditingKey('');
  };

  const edit = (record: O) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  // const save = async (key: React.Key) => {
  //     try {
  //         const row = (await form.validateFields());

  //         const newData = [...data];
  //         const index = newData.findIndex(item => key === item.key);
  //         if (index > -1) {
  //             const item = newData[index];
  //             newData.splice(index, 1, {
  //                 ...item,
  //                 ...row,
  //             });
  //             setData(newData);
  //             setEditingKey('');
  //         } else {
  //             newData.push(row);
  //             setData(newData);
  //             setEditingKey('');
  //         }
  //     } catch (errInfo) {
  //         console.log('Validate Failed:', errInfo);
  //     }
  // };

  const remove = (key: number) => {
    // const newData = [...data]
    console.log('remove', key, data)
    // newData.splice(key - 1, 1)
    // newData.forEach((item, index) => { item.key = index + 1 })
    // setData(newData)
  }

  const operation = {
    title: formatMessage({ id: 'commonandfields.operate' }),
    dataIndex: 'operation',
    fixed: 'right',
    render: (_: any, record: O) => {
      const editable = record.key === editingKey;
      return editable ? (
        <span>
          <Button type='link' onClick={() => save(record.key)} style={{ marginRight: 8 }}>
            <FormattedMessage id='commonandfields.save' />
          </Button>
          <Popconfirm title={formatMessage({ id: 'newlyandopened.prescriptionandtable.sureToCancel' })} onConfirm={cancel}>
            <a><FormattedMessage id='commonandfields.cancel' /></a>
          </Popconfirm>
        </span>
      ) : (
          <div>
            <Button type='link' disabled={editingKey !== ''} onClick={() => edit(record)}>
              <EditOutlined />
            </Button>
            <Button type='link' onClick={() => { remove(record.key) }}>
              <DeleteOutlined />
            </Button>
          </div>
        );
    },
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