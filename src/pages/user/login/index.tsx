import React, { useState } from 'react'
import { Checkbox, Alert, Form } from 'antd'
import { Link } from 'umi'
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale'
import { connect } from 'dva'
import { Dispatch, AnyAction } from 'redux'
import LoginForm from './components/Login'
import { LoginParamsType } from './service'
import { StateType } from './model'
import styles from './index.less'

const { Mobile, Password, Submit } = LoginForm

interface LoginProps {
    dispatch: Dispatch<AnyAction>;
    userAndlogin: StateType;
    submitting?: boolean
}

const LoginMessage: React.FC<{
    content: string
}> = ({ content }) => (
    <Alert
        style={{ marginBottom: 24 }}
        type='error'
        message={content}
        showIcon
    />
)


const Login: React.FC<LoginProps> = props => {
    const { userAndlogin = {}, submitting } = props
    const { status } = userAndlogin
    const [autoLogin, setAutoLogin] = useState(true)
    const handleSubmit = (values: LoginParamsType) => {
        values.autoLogin = autoLogin
        const { dispatch } = props
        dispatch({
            type: 'userAndlogin/login',
            payload: values
        })
    }
    return (
        <div className={styles.main}>
            <div className={styles.image} />
            <div className={styles.loginForm}>
                <h1 className={styles.title}>
                    <FormattedMessage id='userandlogin.login.title' /></h1>
                <LoginForm onSubmit={handleSubmit}>
                    {status === 'error' && !submitting &&
                        (<LoginMessage content={formatMessage({ id: 'userandlogin.status.wrong' })} />)
                    }
                    <Mobile
                        name='mobile'
                        placeholder={formatMessage({ id: 'userandlogin.mobile.placeholder' })}
                        rules={[
                            {
                                required: true,
                                message: formatMessage({ id: 'userandlogin.mobile.required' })
                            },
                            {
                                pattern: /^1\d{10}$/,
                                message: formatMessage({ id: 'userandlogin.mobile.pattern' })
                            }
                        ]}
                    />
                    <Password
                        name='password'
                        placeholder={formatMessage({ id: 'userandlogin.password.placeholder' })}
                        rules={[
                            {
                                required: true,
                                message: formatMessage({ id: 'userandlogin.password.required' })
                            }
                        ]}
                    />
                    <Form.Item name='autoLogin' className={styles.autoLogin}>
                        <Checkbox
                            style={{ fontSize: 10 }}
                            checked={autoLogin}
                            onChange={e => setAutoLogin(e.target.checked)}>
                            <FormattedMessage id='userandlogin.login.autologin' />
                        </Checkbox>
                        <Link to='/user/reset-password' style={{ float: 'right' }} >
                            <FormattedMessage id='userandlogin.login.forgetpassword' />
                        </Link>
                    </Form.Item>
                    <Submit loading={submitting}><FormattedMessage id='userandlogin.login.login' /></Submit>
                </LoginForm>
            </div>
        </div>
    )
}

export default connect(
    ({
        userAndlogin,
        loading
    }: {
        userAndlogin: StateType;
        loading: {
            effects: {
                [key: string]: boolean
            }
        }
    }) => ({
        userAndlogin,
        submitting: loading.effects['userAndlogin/login']
    })
)(Login)