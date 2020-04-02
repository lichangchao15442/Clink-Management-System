import React, { useEffect } from 'react'
import { Form, Row, Col, Select } from 'antd'
import { formatMessage } from 'umi-plugin-react/locale'
import moment from 'moment'

import SelectFilter from '@/components/FilterItem/SelectFilter'
import RangePickerFilter from '@/components/FilterItem/RangePickerFilter'
import SearchFilter from '@/components/FilterItem/SearchFilter'
import { departments } from '@/utils/dataDictionary'
import { DoctorsType } from '@/models/doctors'
import { strDateToMoment } from '@/utils/utils'
import { FilterFieldsType } from '../data'

const { Option } = Select

interface FilterProps {
    doctors: DoctorsType[];
    onFilterChange: (fields: FilterFieldsType) => void;
    filters: any;
}

const Filter: React.FC<FilterProps> = ({ doctors, onFilterChange, filters }) => {
    const [form] = Form.useForm()
    const { setFieldsValue } = form
    const newDepartments = [
        { key: 11111111, label: formatMessage({ id: 'commonandfields.all' }), value: 'all' },
        ...departments
    ]

    const newDoctors = [
        { id: 11111111, name: formatMessage({ id: 'commonandfields.all' }), value: 'all' },
        ...doctors
    ]

    // 由路由的查询条件回显Fliter表单值
    const initFilters = { ...filters }
    initFilters.department = initFilters.department ? Number(initFilters.department) : newDepartments[0].key
    initFilters.doctorName = initFilters.doctorName ? Number(initFilters.doctorName) : newDoctors[0].id
    initFilters.admissionTime = strDateToMoment(filters.admissionTime)
    useEffect(() => { setFieldsValue(initFilters) }, [initFilters])


    const handleFields = (fields: FilterFieldsType) => {
        const newFields = { ...fields }
        const { admissionTime, searchKeywords } = fields
        if (admissionTime && admissionTime.length > 0) {
            newFields.admissionTime = [
                moment(admissionTime[0]).format('YYYY-MM-DD'),
                moment(admissionTime[1]).format('YYYY-MM-DD'),
            ]
        }
        newFields.searchKeywords = searchKeywords ? searchKeywords.replace(/\s*/g, '') : null
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
                department: 11111111,
                doctorName: 11111111
            }}
        >
            <Row gutter={24}>
                <Col lg={7} xl={6}>
                    <SelectFilter
                        label={formatMessage({ id: 'registrationandmanagement.registeredandrecord.registeredDepartment' })}
                        name='department'
                        options={newDepartments}
                        onChange={handleFilterChange}
                    />
                </Col>
                <Col lg={7} xl={6}>
                    <Form.Item
                        label={formatMessage({ id: 'registrationandmanagement.addandregistered.admissionDoctor' })}
                        name='doctorName'
                    >
                        <Select
                            style={{ width: 120 }}
                            onChange={handleFilterChange}
                        >
                            {newDoctors.map(item =>
                                <Option key={item.id} value={item.id}>{item.name}</Option>
                            )}
                        </Select>
                    </Form.Item>
                </Col>
                <Col lg={10} xl={8}>
                    <RangePickerFilter
                        label={formatMessage({ id: 'registrationandmanagement.registeredandrecord.admissionTime' })}
                        name='admissionTime'
                        onChange={handleFilterChange}
                    />
                </Col>
                <Col lg={4} xl={4}>
                    <SearchFilter
                        placeholder={formatMessage({ id: 'registrationandmanagement.registeredandrecord.searchFilter.patientName.placeholder' })}
                        name='searchKeywords'
                        onSearch={handleFilterChange}
                    />
                </Col>
            </Row>
        </Form>
    )
}

export default Filter