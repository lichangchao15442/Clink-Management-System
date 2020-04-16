import React from 'react'
import { Form, Input } from 'antd'
import { FormItemProps } from 'antd/es/form/FormItem'
import ItemMap from './map'

const FormItem = Form.Item


export interface LoginItemProps extends Partial<FormItemProps> {
    name?: string;
    style?: React.CSSProperties;
    placeholder: string;
    buttonText?: React.ReactNode;
    countDown?: number;
    getCaptchaButtonText?: string;
    getCaptchaSecondText?: string;
    type?: string;
    defaultValue?: string;
    defaultProps?: { [key: string]: unknown };
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type WrappedLoginItemProps = LoginItemProps
export interface LoginItemType {
    UserName: React.FC<WrappedLoginItemProps>;
    Password: React.FC<WrappedLoginItemProps>;
    Mobile: React.FC<WrappedLoginItemProps>;
    Captcha: React.FC<WrappedLoginItemProps>;
}

const getFormItemOptions = ({
    onChange,
    defaultValue,
    defaultProps = {},
    rules,
}: LoginItemProps) => {
    const options: {
        rules?: LoginItemProps['rules'];
        onChange?: LoginItemProps['onChange'];
        initialValue?: LoginItemProps['defaultValue'];

    } = {
        rules: rules || (defaultProps.rules as LoginItemProps['rules'])
    }
    if (onChange) {
        options.onChange = onChange
    }
    if (defaultValue) {
        options.initialValue = defaultValue
    }
    return options
}

const LoginItem: React.FC<LoginItemProps> = props => {
    const {
        onChange,
        defaultProps,
        defaultValue,
        rules,
        name,
        getCaptchaButtonText,
        getCaptchaSecondText,
        type,
        ...restProps
    } = props

    // 获取getFieldDecorator的props
    // options包括rules、onChange、initialValue
    const options = getFormItemOptions(props)
    const otherProps = restProps || {}

    return (
        <FormItem name={name} {...options}>
            <Input {...defaultProps} {...otherProps} />
        </FormItem>
    )

}

const LoginItems: Partial<LoginItemProps> = {}

Object.keys(ItemMap).forEach(key => {
    const item = ItemMap[key]
    LoginItems[key] = (props: LoginItemProps) => (
        <LoginItem
            defaultProps={item.props}
            rules={item.rules}
            type={key}
            {...props}
        />
    )
})

export default LoginItems as LoginItemType


