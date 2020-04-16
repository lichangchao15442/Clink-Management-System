import React from 'react'
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale'

import { usages, frequencies } from '@/utils/dataDictionary'


const westernMedicineColumns = [
    {
        title: formatMessage({ id: 'commonandfields.serialNumber' }),
        dataIndex: 'serialNumber',
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
        dataIndex: 'name',
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
        dataIndex: 'unitPrice',
        editable: true,
        render: (text: number) => text && <span>{text.toFixed(2)}</span>
    },
];

const chineseMedicineColumns = [
    {
        title: formatMessage({ id: 'commonandfields.serialNumber' }),
        dataIndex: 'serialNumber',
        width: 80,
        fixed: 'left',
    },
    {
        title: formatMessage({ id: 'newlyandopened.prescriptionandtable.name' }),
        dataIndex: 'name',
        width: 100,
        fixed: 'left',
    },
    {
        title: formatMessage({ id: 'newlyandopened.prescriptionandtable.singleDose' }),
        dataIndex: 'singleDose',
        width: 100,
    },
    {
        title: formatMessage({ id: 'newlyandopened.prescriptionandtable.usage' }),
        dataIndex: 'usage',
        editable: true,
        render: (text: number) => <span>{usages.find(_ => _.key === text)?.label}</span>
    },
    {
        title: formatMessage({ id: 'newlyandopened.prescriptionandtable.unitPrice' }),
        dataIndex: 'unitPrice',
        editable: true,
        render: (text: number) => text && <span>{text.toFixed(2)}</span>
    },
    {
        title: formatMessage({ id: 'newlyandopened.prescriptionandtable.amount' }),
        dataIndex: 'amount',
        editable: true,
        render: (text: number) => text && <span>{text.toFixed(2)}</span>
    }
]


const checkColumns = [
    {
        title: formatMessage({ id: 'commonandfields.serialNumber' }),
        dataIndex: 'serialNumber',
        width: 80,
        fixed: 'left',
    },
    {
        title: formatMessage({ id: 'newlyandopened.prescriptionandtable.name' }),
        dataIndex: 'name',
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
    },
    {
        title: formatMessage({ id: 'newlyandopened.prescriptionandtable.usage' }),
        dataIndex: 'usage',
        editable: true,
        render: (text: number) => <span>{usages.find(_ => _.key === text)?.label}</span>
    },
    {
        title: formatMessage({ id: 'newlyandopened.prescriptionandtable.unitPrice' }),
        dataIndex: 'unitPrice',
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
    }
]

const getColumns = (prescriptionType: number) => {
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