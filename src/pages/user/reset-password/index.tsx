import React, { useState, useEffect } from 'react'
import { Link } from 'umi'
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale'
import { Form, Input, Row, Col, Button, Popover } from 'antd'
import { LockFilled, MobileFilled, MailFilled } from '@ant-design/icons'
import defaultSettings from '@/../config/defaultSettings'
import styles from './index.less'

const { primaryColor } = defaultSettings

const FormItem = Form.Item

const ResetPassword = props => {
    const [form] = Form.useForm()
    const [count, setCount]: [number, any] = useState(0)
    let interval: number | undefined

    useEffect(() => {
        // 在卸载组件的时候执行
        return () => {
            clearInterval(interval)
        }
    }, [])
    const onGetCaptcha = () => {
        let counts = 59
        setCount(counts)
        interval = window.setInterval(() => {
            counts -= 1
            setCount(counts)
            if (counts === 0) {
                clearInterval(interval)
            }
        }, 1000)

    }

    const onFinish = (values) => {
        console.log('onFinish')
    }

    return (
        <div className={styles.main}>
            <div>
                <h1 className={styles.title}>
                    <FormattedMessage id='resetandpassword.reset.reset' />
                </h1>
                <Form form={form} name='ResetPassword' onFinish={onFinish}>
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
                    <Row gutter={8}>
                        <Col span={16}>
                            <FormItem
                                name='captcha'
                                rules={[
                                    {
                                        required: true,
                                        message: formatMessage({ id: 'resetandpassword.verification-code.required' })
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
                                style={{ fontSize: 14, borderRadius: 4, width: 107 }}
                                disabled={!!count}
                                onClick={onGetCaptcha}
                            >
                                {count ? `${count}s` : formatMessage({ id: 'resetandpassword.reset.get-verification-code' })}
                            </Button>
                        </Col>
                    </Row>
                    <Popover>
                        <FormItem
                            name='password'
                            rules={[
                                {
                                }
                            ]}
                        >
                            <Input
                                size='large'
                                type='password'
                                placeholder={formatMessage({ id: 'resetandpassword.password.placeholder' })}
                                prefix={<LockFilled style={{ color: `${primaryColor}`, fontSize: 16 }} />}
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

export default ResetPassword