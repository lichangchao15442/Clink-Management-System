import React from 'react'
import { Row, Col, DatePicker, Select, Input, Form } from 'antd'
import moment from 'moment'
import { formatMessage } from 'umi-plugin-react/locale'

import { visitStatus } from '@/utils/dataDictionary'
import styles from './Filter.less'

const { RangePicker } = DatePicker
const { Option } = Select
const { Search } = Input
const FormItem = Form.Item

const colProps = {
    style: { marginBottom: 10 }
}

const ranges = {
    '今天': [moment(), moment()],
    '昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    '近三天': [moment().subtract(2, 'days'), moment()],
    '近一周': [moment().subtract(1, 'weeks'), moment()],
    '近两周': [moment().subtract(2, 'weeks'), moment()],
    '近三周': [moment().subtract(3, 'weeks'), moment()],
    '最近一个月': [moment().subtract(1, 'months'), moment()],
    '近两个月': [moment().subtract(2, 'months'), moment()],
}

const Filter = ({ onFilterChange }) => {
    const [form] = Form.useForm()
    const visitStatusOptions = [
        { key: 11111111, label: formatMessage({ id: 'commonandfields.all' }), value: 'all' },
        ...visitStatus,
    ]

    const handleCreateTime = (dates, dateString: [string, string]) => {
        const { getFieldsValue } = form
        const fields = getFieldsValue()
        fields.createTime = dateString
        onFilterChange(fields)
    }

    const handleFilterChange = () => {
        const { getFieldsValue } = form
        const fields = getFieldsValue()
        fields.patientName = fields.patientName.replace(/\s*/g, "")
        onFilterChange(fields)
    }
    return (
        <Form form={form}>
            <Row gutter={24}>
                <Col xs={24} sm={14} md={12} lg={9} {...colProps}>
                    <FormItem name='createTime' label={formatMessage({ id: 'commonandfields.createTime' })}>
                        <RangePicker
                            className={styles.rangePick}
                            ranges={ranges}
                            onChange={handleCreateTime}
                        />
                    </FormItem>
                </Col>
                <Col xs={24} sm={7} md={8} lg={6} {...colProps}>
                    <FormItem name='visitStatus' label={formatMessage({ id: 'commonandfields.visitStatus' })}>
                        <Select
                            defaultValue={visitStatusOptions[0].label}
                            style={{ width: 120 }}
                            onChange={handleFilterChange} >
                            {visitStatusOptions.map(item =>
                                <Option key={item.key} value={item.key}>{item.label}</Option>
                            )}
                        </Select>
                    </FormItem>
                </Col>
                <Col xs={24} sm={10} md={8} lg={8} {...colProps}>
                    <FormItem name='patientName'>
                        <Search
                            placeholder={formatMessage({ id: 'workplace.filter.enterName' })}
                            onSearch={handleFilterChange}
                            enterButton />
                    </FormItem>
                </Col>
            </Row>
        </Form>
    )
}

export default Filter