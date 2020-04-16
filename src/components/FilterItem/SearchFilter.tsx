import React from 'react'
import { Form, Input } from 'antd'

const FormItem = Form.Item
const { Search } = Input

interface SearchFilterProps {
    name: string;
    placeholder: string;
    onSearch: () => void
}

const SearchFilter: React.FC<SearchFilterProps> = ({ name, placeholder, onSearch }) => (
    <FormItem name={name}>
        <Search
            placeholder={placeholder}
            onSearch={onSearch}
            enterButton
        />
    </FormItem>
)

export default SearchFilter