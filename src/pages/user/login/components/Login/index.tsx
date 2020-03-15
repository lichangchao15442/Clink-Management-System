import React from 'react'
import { Form } from 'antd'
import { FormInstance } from 'antd/es/form'
import LoginItem, { LoginItemProps } from './LoginItem'
import { LoginParamsType } from '../../service'
import LoginSubmit from './LoginSubmit'


export interface LoginProps {
    style?: React.CSSProperties;
    onSubmit?: (values: LoginParamsType) => void;
    className?: string;
    from?: FormInstance;
    children: React.ReactElement<any>[];
}

interface LoginType extends React.FC<LoginProps> {
    UserName: React.FunctionComponent<LoginItemProps>;
    Password: React.FunctionComponent<LoginItemProps>;
    Mobile: React.FunctionComponent<LoginItemProps>;
    Captcha: React.FunctionComponent<LoginItemProps>;
    Submit: typeof LoginSubmit
}

const Login: LoginType = props => {
    console.log('LoginForm', props)

    return (
        <div>
            <Form
                onFinish={values => {
                    if (props.onSubmit) {
                        props.onSubmit(values as LoginParamsType)
                    }
                }}
            >
                {props.children}
            </Form>
        </div>
    )
}

Login.UserName = LoginItem.UserName
Login.Password = LoginItem.Password
Login.Mobile = LoginItem.Mobile
Login.Captcha = LoginItem.Captcha
Login.Submit = LoginSubmit

export default Login