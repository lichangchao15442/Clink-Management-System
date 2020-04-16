import React from 'react'
import { Card } from 'antd'
import { ArrowUpOutlined } from '@ant-design/icons'
import { FormattedMessage } from 'umi-plugin-react/locale'

import { introduceRowProps } from '../data'
import styles from './IntroduceRow.less'

const IntroduceRow = ({ number, title, percent, logoSrc, logoColor, name, loading }: introduceRowProps) => {
    return (
        <Card loading={loading}>
            <div className={styles.container}>
                <div className={styles.info}>
                    <div className={styles.number}>{number}</div>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.percent}>
                        <ArrowUpOutlined className={`${styles[name]} ${styles.icon}`} />
                        <FormattedMessage id='businessandoverview.introduce.up' />
                        {percent}
                    </div>
                </div>
                <div className={styles.logo} style={{ background: logoColor }}>
                    <img src={logoSrc} alt="logo" />
                </div>
            </div>
        </Card>
    )
}

export default IntroduceRow