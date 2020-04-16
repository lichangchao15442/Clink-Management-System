import React, { useEffect } from 'react'
import { Card, Table, Form, Select, Row, Col, Input } from 'antd'
import { formatMessage } from 'umi-plugin-react/locale'

// import DrugsTable from './DrugsTable'
import { westernMedicineTypes, chineseMedicineTypes, checkItemTypes } from '@/utils/dataDictionary'
import styles from './index.less'
import { Store } from 'rc-field-form/lib/interface'

const { Option } = Select
const { Search } = Input

interface DrugsProps {
    dataSource: A<O>;
    currentPrescription: {
        id: number;
        type: number;
        name: string;
        data: A<O>
    };
    handleFilterDrugs: (allValues: Store) => void;
}

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


const Drugs: React.FC<DrugsProps> = ({ dataSource, currentPrescription, handleFilterDrugs }) => {
    const [form] = Form.useForm()

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
                }}
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                scroll={{ y: 400 }}
                rowKey={(record) => record.id}
            />
        </Card>
    )
}

export default Drugs