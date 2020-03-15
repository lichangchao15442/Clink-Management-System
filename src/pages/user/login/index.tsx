import React, { useState } from 'react'
import { Checkbox } from 'antd'
import { Link } from 'umi'
import LoginForm from './components/Login'
import styles from './index.less'

const { Mobile, Password, Submit } = LoginForm

const Login = props => {
    const [autoLogin, setAutoLogin] = useState(true)
    return (
        <div className={styles.main}>
            <div className={styles.image} />
            <div className={styles.loginForm}>
                <h1 className={styles.title}>登录诊所管理系统</h1>
                <LoginForm>
                    <Mobile
                        name='mobile'
                        placeholder='请输入手机号码'
                        rules={[
                            {
                                required: true,
                                message: '请输入手机号码'
                            },
                            {
                                pattern: /^1\d{10}$/,
                                message: '手机号格式错误'
                            }
                        ]}
                    />
                    <Password
                        name='password'
                        placeholder='请输入密码'
                        rules={[
                            {
                                required: true,
                                message: '请输入手机号'
                            }
                        ]}
                    />
                    <div className={styles.autoLogin}>
                        <Checkbox
                            style={{ fontSize: 10 }}
                            checked={autoLogin}
                            onChange={e => setAutoLogin(e.target.value)}>
                            一个月内免登陆
                        </Checkbox>
                        <Link to='/user/reset-password' style={{ float: 'right' }} > 忘记密码 </Link>
                    </div>
                    <Submit>登录</Submit>
                </LoginForm>
            </div>
        </div>
    )
}

export default Login