import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'umi'
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale'
import { Form, Input, Row, Col, Button, Popover, message, Progress, Alert } from 'antd'
import { LockFilled, MobileFilled, MailFilled } from '@ant-design/icons'
import { connect } from 'dva'
import { Dispatch } from 'redux'
import { Store } from 'rc-field-form/es/interface'
import defaultSettings from '@/../config/defaultSettings'
import styles from './index.less'
import { getFakeCaptcha } from '../login/service'
import { StateType } from './model'

const { primaryColor } = defaultSettings

const FormItem = Form.Item

const passwordStatusMap = {
    ok: (
        <div className={styles.success}>
            <FormattedMessage id='resetandpassword.strength.strong' />
        </div>
    ),
    pass: (
        <div className={styles.warning}>
            <FormattedMessage id='resetandpassword.strength.medium' />
        </div>
    ),
    poor: (
        <div className={styles.error}>
            <FormattedMessage id='resetandpassword.strength.short' />
        </div>
    ),
}

const passwordProgressMap: {
    ok: 'success';
    pass: 'normal';
    poor: 'exception';
} = {
    ok: 'success',
    pass: 'normal',
    poor: 'exception'
}

const ResetMessage: React.FC<{
    content: string
}> = ({ content }) => (
    <Alert
        style={{ marginBottom: 24 }}
        type='error'
        message={content}
        showIcon
    />
)

interface ResetPasswordProps {
    dispatch: Dispatch<any>;
    resetPassword: StateType;
    submitting: boolean;
}

export interface resetPasswordParams {
    mobile: string;
    captcha: string;
    password: string;
    confirm: string;
}


const ResetPassword: React.FC<ResetPasswordProps> = ({ dispatch, resetPassword, submitting }) => {
    const [form] = Form.useForm()
    const [count, setCount]: [number, any] = useState(59)
    const [time, setTime] = useState(false)
    const [visible, setVisible]: [boolean, any] = useState(false)
    const [popover, setPopover]: [boolean, any] = useState(false)
    const captcha = useRef(null)
    let interval: number | undefined
    const { status } = resetPassword

    // 验证码倒计时
    useEffect(() => {
        // 
        if (time) {
            interval = setInterval(() => {
                setCount((preSecond: number) => {
                    if (preSecond <= 1) {
                        setTime(false)
                        clearInterval(interval)
                        // 重置秒数
                        return 59
                    }
                    return preSecond - 1
                })
            }, 1000)
        }
        // 在卸载组件的时候执行
        return () => {
            clearInterval(interval)
        }
    }, [time])

    const onGetCaptcha = async (mobile: string) => {
        // 请求验证码
        setTime(true)
        const result = await getFakeCaptcha(mobile)
        if (result === false) {
            return;
        }
        captcha.current = result
        message.success(`获取验证码成功！验证码为：${result}`)
    }

    // 密码安全性校验
    const checkPassword = (_: any, value: string) => {
        const promise = Promise
        // 没有值
        if (!value) {
            setVisible(false)
            return promise.reject(formatMessage({ id: 'resetandpassword.password.required' }))
        }
        // 有值
        if (!visible) {
            setVisible(!!value)
        }

        // 有值的情况下手动渲染一次页面，使Popover组件重新渲染
        setPopover(!popover)

        if (value.length < 6) {
            return promise.reject('')
        }
        return promise.resolve()
    }

    const getPasswordStatus = () => {
        const value = form.getFieldValue('password')
        if (value && value.length > 9) {
            return 'ok'
        }
        if (value && value.length > 5) {
            return 'pass'
        }
        return 'poor'
    }

    const renderPasswordProgress = () => {
        const value = form.getFieldValue('password')
        const pStatus = getPasswordStatus()
        return value && value.length ? (
            <div className={styles[`progress-${pStatus}`]}>
                <Progress
                    percent={value.length * 10 > 100 ? 100 : value.length * 10}
                    showInfo={false}
                    className={styles.progress}
                    status={passwordProgressMap[pStatus]}
                    strokeWidth={6}
                />
            </div>

        ) : null
    }

    const checkConfirm = () => {
        const promise = Promise
        const value = form.getFieldValue('confirm')
        if (value && value !== form.getFieldValue('password')) {
            return promise.reject(formatMessage({ id: 'resetandpassword.password.twice' }))
        }
        return promise.resolve()
    }

    const checkCaptcha = (_: any, value: string) => {
        const promise = Promise
        if (!value || value === captcha.current) {
            return promise.resolve()
        }
        return promise.reject(formatMessage({ id: 'resetandpassword.captcha.wrong' }))

    }

    const onFinish = (values: Store) => {
        setVisible(false)
        dispatch({
            type: 'resetPassword/submit',
            payload: values
        })

    }

    return (
        <div className={styles.main}>
            <div>
                <h1 className={styles.title}>
                    <FormattedMessage id='resetandpassword.reset.reset' />
                </h1>
                <Form form={form} name='ResetPassword' onFinish={onFinish}>
                    {status === 'error' && !submitting && (<ResetMessage content={formatMessage({ id: 'resetandpassword.mobile.noAuthority' })} />)}
                    <FormItem
                        name='mobile'
                        rules={[
                            {
                                required: true,
                                message: formatMessage({ id: 'resetandpassword.mobile.required' })
                            },
                            {
                                pattern: /^1\d{10}$/,
                                message: formatMessage({ id: 'resetandpassword.mobile.pattern' })
                            }
                        ]}
                    >
                        <Input
                            size='large'
                            placeholder={formatMessage({ id: 'resetandpassword.mobile.placeholder' })}
                            prefix={<MobileFilled style={{ color: `${primaryColor}`, fontSize: 16 }} />}
                        />
                    </FormItem>
                    <FormItem shouldUpdate>
                        {({ getFieldValue }) => (
                            <Row gutter={8}>
                                <Col span={16}>
                                    <FormItem
                                        style={{ marginBottom: 0 }}
                                        name='captcha'
                                        rules={[
                                            {
                                                required: true,
                                                message: formatMessage({ id: 'resetandpassword.verification-code.required' })
                                            },
                                            {
                                                validator: checkCaptcha,
                                                validateTrigger: 'onSubmit',
                                            }
                                        ]}
                                    >
                                        <Input
                                            size='large'
                                            placeholder={formatMessage({ id: 'resetandpassword.verification-code.placeholder' })}
                                            prefix={<MailFilled style={{ color: `${primaryColor}`, fontSize: 16 }} />}
                                        />
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <Button
                                        size='large'
                                        type='primary'
                                        className={styles.getCaptcha}
                                        disabled={time}
                                        onClick={() => {
                                            const value = getFieldValue('mobile')
                                            onGetCaptcha(value)
                                        }}
                                    >
                                        {time ? count + formatMessage({ id: 'resetandpassword.reset.resend-verification-code' }) : formatMessage({ id: 'resetandpassword.reset.get-verification-code' })}
                                    </Button>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    <Popover
                        getPopupContainer={node => {
                            if (node && node.parentNode) {
                                return node.parentNode as HTMLElement
                            }
                            return node
                        }}
                        placement='right'
                        overlayStyle={{ width: 240 }}
                        content={
                            visible && (
                                <div style={{ padding: '4px 0', fontSize: 12 }}>
                                    {passwordStatusMap[getPasswordStatus()]}
                                    {renderPasswordProgress()}
                                    <div style={{ marginTop: 10 }}>
                                        <FormattedMessage id='resetandpassword.strength.msg' />
                                    </div>
                                </div>
                            )
                        }
                        visible={visible}
                    >
                        <FormItem
                            name='password'
                            rules={[
                                {
                                    validator: checkPassword
                                }
                            ]}
                        >
                            <Input
                                size='large'
                                type='password'
                                placeholder={formatMessage({ id: 'resetandpassword.password.placeholder' })}
                                prefix={<LockFilled style={{ color: `${primaryColor}`, fontSize: 16 }} />}
                                onBlur={() => { setVisible(false) }}
                                onFocus={() => { setVisible(true) }}
                            />
                        </FormItem>
                    </Popover>
                    <FormItem
                        name='confirm'
                        rules={[
                            {
                                required: true,
                                message: formatMessage({ id: 'resetandpassword.confirm-password.required' })
                            },
                            {
                                validator: checkConfirm
                            }
                        ]}
                    >
                        <Input
                            size='large'
                            type='password'
                            placeholder={formatMessage({ id: 'resetandpassword.confirm-password.placeholder' })}
                            prefix={<LockFilled style={{ color: `${primaryColor}`, fontSize: 16 }} />}
                        />
                    </FormItem>
                    <FormItem>
                        <Button
                            size='large'
                            type='primary'
                            htmlType='submit'
                            style={{ width: '100%', fontSize: 14 }}
                            loading={submitting}
                        >
                            <FormattedMessage id='resetandpassword.reset.ensure' />
                        </Button>
                        <div className={styles.signIn}>
                            <Link to='/user/login'>
                                <FormattedMessage id='resetandpassword.reset.sign-in' />
                            </Link>
                        </div>
                    </FormItem>
                </Form>
            </div>

        </div>
    )
}

export default connect(
    ({ resetPassword, loading }: {
        resetPassword: StateType;
        loading: {
            effects: {
                [key: string]: boolean
            }
        }
    }) => ({
        resetPassword,
        submitting: loading.effects['resetPassword/submit']
    })
)(ResetPassword)