import React from 'react'
import { Form, Row, Col } from 'antd'
import { formatMessage } from 'umi-plugin-react/locale'
import moment from 'moment'

import SelectFilter from '@/components/FilterItem/SelectFilter'
import RangePickerFilter from '@/components/FilterItem/RangePickerFilter'
import SearchFilter from '@/components/FilterItem/SearchFilter'
import { vipLevels } from '@/utils/dataDictionary'
import { strDateToMoment } from '@/utils/utils'

const colProps = {
    style: { marginBottom: 10 }
}


interface FilterProps {
    onFilterChange: (fields: any) => void;
    filters: any
}

const Filter: React.FC<FilterProps> = ({ onFilterChange, filters }) => {
    const [form] = Form.useForm()
    const { setFieldsValue } = form
    const initValues = {
        ...filters
    }

    const newVipLevels = vipLevels.map(item => {
        const label = item.value === 0 ? formatMessage({ id: 'commonandfields.notVip' }) : `VIP${item.value}`
        return {
            ...item,
            label
        }
    })
    newVipLevels.unshift({ key: 11111111, label: formatMessage({ id: 'commonandfields.all' }), value: 11111111 })

    // 设置表单的值
    initValues.vipLevel = filters.vipLevel ? Number(filters.vipLevel) : newVipLevels[0].key
    const initCreateTime = strDateToMoment(filters.createTime)
    initValues.createTime = initCreateTime
    setFieldsValue(initValues)

    const handleFields = (fields: any) => {
        const newFields = { ...fields }
        const { createTime, searchKeywords } = fields
        if (createTime && createTime.length) {
            newFields.createTime = [
                moment(createTime[0]).format('YYYY-MM-DD'),
                moment(createTime[1]).format('YYYY-MM-DD')
            ]
        }
        newFields.searchKeywords = searchKeywords ? searchKeywords.replace(/\s*/g, "") : null
        return newFields
    }

    const handleFilterChange = () => {
        const { getFieldsValue } = form
        const fields = getFieldsValue()
        const newFields = handleFields(fields)
        onFilterChange(newFields)
    }

    return (
        <Form form={form}>
            <Row gutter={24}>
                <Col xs={24} sm={7} md={8} lg={6} {...colProps}>
                    <SelectFilter
                        name='vipLevel'
                        label={formatMessage({ id: 'commonandfields.vipType' })}
                        options={newVipLevels}
                        onChange={handleFilterChange}
                    />
                </Col>
                <Col xs={24} sm={14} md={12} lg={9} {...colProps}>
                    <RangePickerFilter
                        name='createTime'
                        label={formatMessage({ id: 'commonandfields.createTime' })}
                        onChange={handleFilterChange}
                    />
                </Col>
                <Col xs={24} sm={10} md={8} lg={8} {...colProps}>
                    <SearchFilter
                        name='searchKeywords'
                        placeholder={formatMessage({ id: 'patientandmanagement.filter.nameAndMobile' })}
                        onSearch={handleFilterChange}
                    />
                </Col>
            </Row>
        </Form>
    )
}

export default Filter