import React from 'react'
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale'
import { Button, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import { usages, frequencies } from '@/utils/dataDictionary'









const getColumns = (prescriptionType: number, params: {
  editingKey: string | number;
  edit: (record: O) => void;
  remove: (key: number) => void;
  save: (key: number) => void;
  cancel: () => void;
}) => {
  const { editingKey, edit, remove, save, cancel } = params
  const westernMedicineColumns = [
    {
      title: formatMessage({ id: 'commonandfields.serialNumber' }),
      dataIndex: 'key',
      width: 80,
      fixed: 'left',
    },
    {
      title: formatMessage({ id: 'newlyandopened.prescriptionandtable.groupNumber' }),
      dataIndex: 'groupNumber',
      width: 100,
      editable: true,
      fixed: 'left',
    },
    {
      title: formatMessage({ id: 'newlyandopened.prescriptionandtable.name' }),
      dataIndex: 'drugName',
      width: 100,
      fixed: 'left',
    },
    {
      title: formatMessage({ id: 'newlyandopened.prescriptionandtable.singleUsage' }),
      dataIndex: 'singleUsage',
      editable: true,
      render: (text: number) => <span>{text}<FormattedMessage id='newlyandopened.prescriptionandtable.singleUsage.unit' /></span>
    },
    {
      title: formatMessage({ id: 'newlyandopened.prescriptionandtable.usage' }),
      dataIndex: 'usage',
      editable: true,
      render: (text: number) => <span>{usages.find(_ => _.key === text)?.label}</span>
    },
    {
      title: formatMessage({ id: 'newlyandopened.prescriptionandtable.frequency' }),
      dataIndex: 'frequency',
      editable: true,
      render: (text: number) => <span>{frequencies.find(_ => _.key === text)?.label}</span>
    },
    {
      title: formatMessage({ id: 'newlyandopened.prescriptionandtable.days' }),
      dataIndex: 'days',
      width: 100,
      editable: true,
    },
    {
      title: formatMessage({ id: 'newlyandopened.prescriptionandtable.total' }),
      dataIndex: 'total',
      editable: true,
      render: (text: number) => <span>{text}<FormattedMessage id='newlyandopened.prescriptionandtable.total.unit' /></span>,
      width: 200
    },
    {
      title: formatMessage({ id: 'newlyandopened.prescriptionandtable.unitPrice' }),
      dataIndex: 'price',
      editable: true,
      render: (text: number) => text && <span>{text.toFixed(2)}</span>
    },
    {
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
  ];

  const chineseMedicineColumns = [
    {
      title: formatMessage({ id: 'commonandfields.serialNumber' }),
      dataIndex: 'key',
      width: 80,
      fixed: 'left',
    },
    {
      title: formatMessage({ id: 'newlyandopened.prescriptionandtable.name' }),
      dataIndex: 'drugName',
      width: 100,
      fixed: 'left',
    },
    {
      title: formatMessage({ id: 'newlyandopened.prescriptionandtable.singleDose' }),
      dataIndex: 'singleUsage',
      width: 100,
      render: (text: number) => <span>{text}g</span>
    },
    {
      title: formatMessage({ id: 'newlyandopened.prescriptionandtable.usage' }),
      dataIndex: 'usage',
      editable: true,
      render: (text: number) => <span>{usages.find(_ => _.key === text)?.label}</span>
    },
    {
      title: formatMessage({ id: 'newlyandopened.prescriptionandtable.unitPrice' }),
      dataIndex: 'price',
      editable: true,
      render: (text: number) => text && <span>{text.toFixed(2)}</span>
    },
    {
      title: formatMessage({ id: 'newlyandopened.prescriptionandtable.amount' }),
      dataIndex: 'amount',
      editable: true,
      render: (text: number) => text && <span>{text.toFixed(2)}</span>
    },
    {
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
  ]

  const checkColumns = [
    {
      title: formatMessage({ id: 'commonandfields.serialNumber' }),
      dataIndex: 'key',
      width: 80,
      fixed: 'left',
    },
    {
      title: formatMessage({ id: 'newlyandopened.prescriptionandtable.name' }),
      dataIndex: 'drugName',
      width: 100,
      fixed: 'left',
    },
    {
      title: formatMessage({ id: 'newlyandopened.prescriptionandtable.part' }),
      dataIndex: 'part',
      width: 100,
    },
    {
      title: formatMessage({ id: 'newlyandopened.prescriptionandtable.quantity' }),
      dataIndex: 'quantity',
      width: 100,
      render: (text: number, record: O) => <span>{text}{record.unit}</span>
    },
    {
      title: formatMessage({ id: 'newlyandopened.prescriptionandtable.usage' }),
      dataIndex: 'usage',
      editable: true,
      render: (text: number) => <span>{usages.find(_ => _.key === text)?.label}</span>
    },
    {
      title: formatMessage({ id: 'newlyandopened.prescriptionandtable.unitPrice' }),
      dataIndex: 'price',
      editable: true,
      render: (text: number) => text && <span>{text.toFixed(2)}</span>
    },
    {
      title: formatMessage({ id: 'newlyandopened.prescriptionandtable.amount' }),
      dataIndex: 'amount',
      editable: true,
      render: (text: number) => text && <span>{text.toFixed(2)}</span>
    },
    {
      title: formatMessage({ id: 'newlyandopened.prescriptionandtable.remark' }),
      dataIndex: 'remark',
      editable: true,
    },
    {
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
  ]
  let columns
  switch (prescriptionType) {
    case 10001801:
      columns = chineseMedicineColumns
      break;

    case 10001802:
      columns = checkColumns
      break;

    default:
      columns = westernMedicineColumns
      break;
  }
  return columns
}

export default getColumns