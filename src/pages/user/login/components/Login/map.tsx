import { UserOutlined, LockFilled, MobileFilled, MailTwoTone } from '@ant-design/icons'
import React from 'react'
import defaultSettings from '@/../config/defaultSettings'

const { primaryColor } = defaultSettings
export default {
    UserName: {
        props: {
            size: 'large',
            id: 'userName',
            prefix: (
                <UserOutlined
                    style={{ color:`${primaryColor}` }}
                />
            ),
            placeholder: 'admin'
        },
        rules: [
            {
                required: true,
                message: 'Please enter username!'
            }
        ]
    },
    Password: {
        props: {
            size: 'large',
            id: 'password',
            type: 'password',
            prefix: (
                <LockFilled style={{ color:`${primaryColor}`, fontSize: 16 }} />
            ),
            placeholder: '888888'
        },
        rules: [
            {
                required: true,
                message: 'Please enter password!'
            }
        ]
    },
    Mobile: {
        props: {
            size: 'large',
            prefix: (
                <MobileFilled style={{ color:`${primaryColor}`, fontSize: 16 }} />
            ),
            placeholder: 'mobile number'
        },
        rules: [
            {
                required: true,
                message: 'Please enter password!'
            },
            {
                pattern: /^1\d{10}$/,
                message: 'Wrong mobile number format!'
            }
        ]
    },
    Captcha: {
        props: {
            size: 'large',
            prefix: (
                <MailTwoTone style={{ color:`${primaryColor}` }} />
            ),
            placeholder: 'captcha'
        },
        rules: [
            {
                required: true,
                message: 'Please enter Captcha!'
            }
        ]
    },
}