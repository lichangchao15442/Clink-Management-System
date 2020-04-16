import React, { useState } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { Card, Form, Input, Popover, Progress, Button, Alert } from 'antd'
import { connect } from 'dva'
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale'
import { SaveFilled } from '@ant-design/icons'
import { Dispatch } from 'redux'
import { StateType } from './model'
import styles from './index.less'

const FormItem = Form.Item

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 }
    }
}

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

interface changePasswordParams {
    oldPassword: string;
    newPassword: string;
    confirm: string;
}

interface ChangePasswordProps {
    dispatch: Dispatch;
    submitLoading: boolean;
    status: string;
}

const ChangeMessage: React.FC<{
    content: string
}> = ({ content }) => (
    <Alert
        style={{ marginBottom: 24 }}
        type='error'
        message={content}
        showIcon
    />
)

const ChangePassword: React.FC<ChangePasswordProps> = props => {
    const { submitLoading, status } = props
    const [form] = Form.useForm()
    const [visible, setVisible]: [boolean, any] = useState(false)
    const [popover, setPopover]: [boolean, any] = useState(false)

    const getPasswordStatus = () => {
        const value = form.getFieldValue('newPassword')
        if (value && value.length > 9) {
            return 'ok'
        }
        if (value && value.length > 5) {
            return 'pass'
        }
        return 'poor'
    }


    const renderPasswordProgress = () => {
        const value = form.getFieldValue('newPassword')
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

    const checkConfirm = () => {
        const promise = Promise
        const value = form.getFieldValue('confirm')
        if (value && value !== form.getFieldValue('newPassword')) {
            return promise.reject(formatMessage({ id: 'resetandpassword.password.twice' }))
        }
        return promise.resolve()
    }

    const onFinish = (values: changePasswordParams) => {
        const { dispatch } = props
        dispatch({
            type: 'changePassword/submit',
            payload: values
        })
    }

    return (
        <PageHeaderWrapper>
            <Card bordered={false}>
                <Form
                    form={form}
                    name='changePassword'
                    layout='vertical'
                    onFinish={onFinish}

                >
                    <FormItem className={styles.saveButton}>
                        <Button
                            type='primary'
                            htmlType='submit'
                            icon={<SaveFilled className={styles.icon}
                                loading={submitLoading}
                            />}
                        >
                            <FormattedMessage id='change-password.submit' />
                        </Button>
                    </FormItem>
                    <div style={{ transform: 'translateX(30%)' }}>
                        {status === 'error' &&
                            <FormItem {...formItemLayout}>
                                <ChangeMessage content={formatMessage({ id: 'change-password.submit.wrong' })} />
                            </FormItem>
                        }
                        <FormItem
                            {...formItemLayout}
                            label={formatMessage({ id: 'change-password.oldPassword' })}
                            name='oldPassword'
                            rules={[{ required: true, message: formatMessage({ id: 'change-password.oldPassword.required' }) }]}
                        >
                            <Input type='password' placeholder={formatMessage({ id: 'change-password.oldPassword.placeholder' })} />
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
                                {...formItemLayout}
                                label={formatMessage({ id: 'change-password.newPassword' })}
                                name='newPassword'
                                rules={[
                                    {
                                        validator: checkPassword
                                    }
                                ]}
                            >
                                <Input
                                    type='password'
                                    placeholder={formatMessage({ id: 'resetandpassword.password.placeholder' })}
                                    onBlur={() => { setVisible(false) }}
                                    onFocus={() => { setVisible(true) }}
                                />
                            </FormItem>
                        </Popover>
                        <FormItem
                            {...formItemLayout}
                            label={formatMessage({ id: 'change-password.confirm' })}
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
                                type='password'
                                placeholder={formatMessage({ id: 'resetandpassword.confirm-password.placeholder' })}
                            />
                        </FormItem>
                    </div>
                </Form>
            </Card>
        </PageHeaderWrapper>
    )
}

export default connect(({ changePassword, loading }: {
    changePassword: StateType;
    loading: {
        effects: {
            [key: string]: boolean
        }
    }
}) => ({
    status: changePassword.status,
    submitLoading: loading.effects['changePassword/submit']
}))(ChangePassword)