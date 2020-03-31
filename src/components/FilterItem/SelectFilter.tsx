import React from 'react'
import { Form, Select } from 'antd'

const FormItem = Form.Item
const { Option } = Select

interface optionsType {
    key: number;
    label: string;
    value?: string | number;
}

interface SelectFilterProps {
    name: string;
    label: string;
    options: optionsType[];
    onChange: () => void;
}

const SelectFilter: React.FC<SelectFilterProps> = ({ name, label, options, onChange }) => (
        <FormItem name={name} label={label}>
            <Select
                defaultValue={options[0].key}
                style={{ width: 120 }}
                onChange={onChange} >
                {options.map(item =>
                    <Option key={item.key} value={item.key}>{item.label}</Option>
                )}
            </Select>
        </FormItem>
    )

export default SelectFilter