import React, { useState, useEffect } from 'react'
import { Card, Button, Form, Table, Popconfirm } from 'antd'
import { SettingFilled } from '@ant-design/icons'
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale'

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

    const isEditing = (record) => record.key === editingKey

    const cancel = () => {
        setEditingKey('');
    };

    const edit = (record) => {
        form.setFieldsValue({ ...record });
        setEditingKey(record.key);
    };

    const save = async (key: React.Key) => {
        try {
            // const row = (await form.validateFields()) as WesternMedicineTableDataType;
            const row = (await form.validateFields());

            const newData = [...data];
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

    const operation = {
        title: formatMessage({ id: 'commonandfields.operate' }),
        dataIndex: 'operation',
        fixed: 'right',
        render: (_: any, record) => {
            const editable = isEditing(record);
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
                    <Button type='link' disabled={editingKey !== ''} onClick={() => edit(record)}>
                        <FormattedMessage id='commonandfields.edit' />
                    </Button>
                );
        },
    }

    useEffect(() => {
        setData(currentPrescription.data)
        // 注意：如果直接在useEffect外面并不使用useState修改columns的值，会出现columns与originData更新不同步的问题
        // 也就会导致table中的render属性值，直接导致报错
        // 解决方法：在setData(originData)后面setColumn(newColumn)
        const columns = getColumns(currentPrescription.type)
        const newColumn = [...columns]
        newColumn.push(operation)
        setColumn(newColumn)
    }, [currentPrescription])

    const mergedColumns = column.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <Card
            className={styles.prescriptionTable}
            style={{ height: 600 }}
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