import React from 'react'
import { Form, Button } from 'antd'
import { ButtonProps } from 'antd/es/button'

const FormItem = Form.Item

interface LoginSubmitProps extends ButtonProps {
    className?: string;
}

const LoginSubmit: React.FC<LoginSubmitProps> = ({ className, ...rest }) => {
    return (
        <FormItem>
            <Button style={{ width: '100%',fontSize:14 }} size='large' type='primary' htmlType='submit' {...rest} />
        </FormItem>
    )
}

export default LoginSubmit