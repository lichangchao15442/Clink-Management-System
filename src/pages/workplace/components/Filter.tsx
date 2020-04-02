import React, { useEffect } from 'react'
import { Row, Col, Form } from 'antd'
import { formatMessage } from 'umi-plugin-react/locale'
import moment from 'moment'

import { visitStatus } from '@/utils/dataDictionary'
import RangePickerFilter from '@/components/FilterItem/RangePickerFilter'
import SelectFilter from '@/components/FilterItem/SelectFilter'
import SearchFilter from '@/components/FilterItem/SearchFilter'
import { strDateToMoment } from '@/utils/utils'


const colProps = {
    style: { marginBottom: 10 }
}

interface FilterProps {
    onFilterChange: ({ createTime, visitStatus, patientName }:
        {
            createTime?: [string, string],
            visitStatus?: string,
            patientName?: string | null
        }) => void;
    filters: {
        createTime?: any,
        visitStatus?: string | number,
        patientName?: string | null
    }
}


const Filter: React.FC<FilterProps> = ({ onFilterChange, filters }) => {
    const [form] = Form.useForm()
    const { setFieldsValue } = form

    const visitStatusOptions = [
        { key: 11111111, label: formatMessage({ id: 'commonandfields.all' }), value: 'all' },
        ...visitStatus,
    ]

    // 由路由中的参数设置过滤中的值（防止出现路由中有值，过滤表单中无值）
    const initValues = {
        ...filters
    }
    initValues.createTime = strDateToMoment(filters.createTime)
    initValues.visitStatus = filters.visitStatus ? Number(filters.visitStatus) : visitStatusOptions[0].key
    useEffect(() => {
        setFieldsValue(initValues)
    }, [initValues])



    const handleFields = (fields: any) => {
        const { createTime } = fields
        const newFields = { ...fields }
        if (createTime && createTime.length) {
            newFields.createTime = [
                moment(createTime[0]).format('YYYY-MM-DD'),
                moment(createTime[1]).format('YYYY-MM-DD'),
            ]
        }
        newFields.patientName = fields.patientName ? fields.patientName.replace(/\s*/g, "") : null
        return newFields
    }

    const handleFilterChange = async () => {
        const { getFieldsValue } = form
        const fields = await getFieldsValue()
        const newFields = handleFields(fields)
        onFilterChange(newFields)
    }
    return (
        <Form
            form={form}
            initialValues={{
                visitStatus: 11111111
            }}
        >
            <Row gutter={24}>
                <Col xs={24} sm={14} md={12} lg={9} {...colProps}>
                    <RangePickerFilter
                        name='createTime'
                        label={formatMessage({ id: 'commonandfields.createTime' })}
                        onChange={handleFilterChange}
                    />
                </Col>
                <Col xs={24} sm={7} md={8} lg={6} {...colProps}>
                    <SelectFilter
                        name='visitStatus'
                        label={formatMessage({ id: 'commonandfields.visitStatus' })}
                        options={visitStatusOptions}
                        onChange={handleFilterChange}
                    />
                </Col>
                <Col xs={24} sm={10} md={8} lg={8} {...colProps}>
                    <SearchFilter
                        name='patientName'
                        placeholder={formatMessage({ id: 'workplace.filter.enterName' })}
                        onSearch={handleFilterChange}
                    />
                </Col>
            </Row>
        </Form>
    )
}

export default Filter