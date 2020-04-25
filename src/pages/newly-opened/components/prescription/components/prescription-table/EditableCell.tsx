import React from 'react'
import { Select, InputNumber, Form } from 'antd'
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale'

import { usages, frequencies } from '@/utils/dataDictionary'


const { Option } = Select
const groupNumbers = [1, 2, 3, 4, 5, 6, 7]


interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  record: any;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  record,
  index,
  children,
  ...restProps
}) => {
  let inputNode
  switch (dataIndex) {
    case 'groupNumber':
    /* 合并两种情形 */
    // eslint-disable-next-line no-fallthrough
    case 'days':
      inputNode = <Select>{groupNumbers.map(item => <Option key={item} value={item}>{item}</Option>)}</Select>
      break;

    case 'singleUsage':
      inputNode = <InputNumber style={{ width: 70 }} min={0} />
      break;
    case 'usage':
      inputNode = <Select>{usages.map(item => <Option key={item.key} value={item.key}>{item.label}</Option>)}</Select>
      break;
    case 'frequency':
      inputNode = <Select>{frequencies.map(item => <Option key={item.key} value={item.key}>{item.label}</Option>)}</Select>
      break;
    case 'total':
      inputNode = <InputNumber style={{ width: 70 }} min={0} />
      break;
    case 'unitPrice':
      inputNode = <InputNumber min={0} step={0.01} />
      break;

    default:
      inputNode = <InputNumber />
      break;
  }

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item>
          <Form.Item
            noStyle
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `${formatMessage({ id: 'newlyandopened.prescriptionandtable.pleaseInput' })}${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
          <span>
            {dataIndex === 'singleUsage' && <FormattedMessage id='newlyandopened.prescriptionandtable.singleUsage.unit' />}
            {dataIndex === 'total' && <FormattedMessage id='newlyandopened.prescriptionandtable.total.unit' />}
          </span>
        </Form.Item>
      ) : (
          children
        )}
    </td>
  );
};

export default EditableCell