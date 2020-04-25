import React, { useEffect, useState, ReactText } from 'react'
import { Card, Table, Form, Select, Row, Col, Input, Button, message } from 'antd'
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale'

import { westernMedicineTypes, chineseMedicineTypes, checkItemTypes } from '@/utils/dataDictionary'
import styles from './index.less'
import { Store } from 'rc-field-form/lib/interface'

const { Option } = Select
const { Search } = Input


const otherDrugsColumns = [
  {
    title: '名称',
    dataIndex: 'drugName'
  },
  {
    title: '规格',
    dataIndex: 'specification'
  },
  {
    title: '库存',
    dataIndex: 'stock'
  },
  {
    title: '价格',
    dataIndex: 'price'
  },
]

const checkItemDrugsColumns = [
  {
    title: '名称',
    dataIndex: 'drugName'
  },
  {
    title: '类型',
    dataIndex: 'drugType',
    render: (type: number) => checkItemTypes.find(_ => _.key === type)?.label
  },
  {
    title: '单位',
    dataIndex: 'unit'
  },
  {
    title: '价格',
    dataIndex: 'price'
  },
]

interface DrugsProps {
  dataSource: A<O>;
  currentPrescription: {
    id: number;
    type: number;
    name: string;
    data: A<O>
  };
  handleFilterDrugs: (allValues: Store) => void;
  handleAddDrugs: (drugIdArray: ReactText[]) => void;
}

const Drugs: React.FC<DrugsProps> = ({ dataSource, currentPrescription, handleFilterDrugs, handleAddDrugs }) => {
  const [form] = Form.useForm()
  const [selectedRowKeys, setSelectedRowKeys] = useState<ReactText[]>([])

  const prescriptionType = currentPrescription.type
  const columns = prescriptionType === 10001802 ? checkItemDrugsColumns : otherDrugsColumns
  const drugsTypeLabel = prescriptionType === 10001802 ?
    formatMessage({ id: 'newlyandopened.drugs.checkItemType' }) :
    formatMessage({ id: 'newlyandopened.drugs.drugsType' })

  const enterDrugNameTabel = prescriptionType === 10001802 ?
    formatMessage({ id: 'newlyandopened.drugs.enterCheckName' }) :
    formatMessage({ id: 'newlyandopened.drugs.enterDrugName' })


  let drugsTypeOptions
  switch (prescriptionType) {
    case 10001801:
      drugsTypeOptions = chineseMedicineTypes
      break;

    case 10001802:
      drugsTypeOptions = checkItemTypes
      break;

    default:
      drugsTypeOptions = westernMedicineTypes
      break;
  }

  // 当前处方按钮改变，就清空过滤表单的值
  useEffect(() => { form.resetFields() }, [currentPrescription.id])

  // 过滤表单值变化，进行数据过滤，把过滤字段交给父组件进行请求
  const handleValuesChange = (changedValues: Store, allValues: Store) => {
    handleFilterDrugs(allValues)
  }

  const onSelectChange = (selectedRowKeys: ReactText[]) => {
    setSelectedRowKeys(selectedRowKeys)
  }

  // 添加药品（主要功能：将选中的药品数据交给父组件处理）
  const addDrugs = () => {
    // 将数据传给父组件(有数据才传递)
    if (selectedRowKeys.length) {
      //（只将药品的ID传给父组件即可，父组件拿到药品ID再次查找数据，这里考虑到每一种药物在添加到处方数据中都有自己的初始值，由后台给）
      handleAddDrugs(selectedRowKeys)
      // 传递完之后清空选中的数据
      setSelectedRowKeys([])
    } else {
      // 提示请选择要添加的药品
      message.warn(formatMessage({ id: 'newlyandopened.drugs.pleaseSelectDrug' }))
    }
  }
  return (
    <Card
      className={styles.drugs}
      style={{ height: 600 }}
      bordered={false}
    >
      <Form
        layout='horizontal'
        form={form}
        initialValues={{
          drugType: ''
        }}
        onValuesChange={handleValuesChange}
      >
        <Row gutter={16}>
          <Col xl={12} lg={24}>
            <Form.Item
              label={drugsTypeLabel}
              name='drugType'
            >
              <Select style={{ width: 100, marginLeft: 10 }}>
                <Option key='' value=''>{formatMessage({ id: 'newlyandopened.drugs.allType' })}</Option>
                {drugsTypeOptions.map(item => <Option key={item.key} value={item.key}>{item.label}</Option>)}
              </Select>
            </Form.Item>
          </Col>
          <Col xl={12} lg={24}>
            <Form.Item
              name='drugName'
            >
              <Search
                placeholder={enterDrugNameTabel}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys,
          onChange: onSelectChange
        }}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        scroll={{ y: 400 }}
        rowKey={(record) => record.id}
      />
      <Button className={styles.addDrugsBtn} type='primary' onClick={addDrugs}>
        <FormattedMessage id='newlyandopened.drugs.addDrugs' />
      </Button>
    </Card>
  )
}

export default Drugs