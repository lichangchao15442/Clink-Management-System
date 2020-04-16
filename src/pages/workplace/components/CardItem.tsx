import React from 'react'
import { Card, Avatar, Button } from 'antd'
import { FormattedMessage } from 'umi-plugin-react/locale'
import classnames from 'classnames'

import styles from './CardItem.less'


const { Meta } = Card

interface CardItem {
    item: any;
}

const CardItem: React.FC<CardItem> = ({ item }) => (
        <div className={styles.cardItem} >
            <Card
                bordered={false}
                // bodyStyle={{ height: 180 }}
                actions={[
                    <span className={styles.admission}><FormattedMessage id='workplace.admission' /></span>,
                    <span className={styles.check}><FormattedMessage id='workplace.checkPatientInfo' /></span>,
                ]}
            >
                <Meta
                    avatar={<Avatar size="large" src={item.avatar} />}
                    title={
                        <div className={styles.title}>
                            <span className={styles.patientName}>{item.patientName}</span>
                            {item.vipLevel ? <span className={styles.vip}>VIP{item.vipLevel}</span> : null}
                            <span>{item.gender}</span>
                            <span>{item.age}</span>
                            <Button className={classnames(styles.visitStatusBtn, styles[item.visitStatusColor])}>{item.visitStatus}</Button>
                        </div>
                    }
                    description={
                        <div className={styles.description}>
                            <span>
                                <FormattedMessage id='commonandfields.createTime' />：
                        {item.createTime}
                            </span>
                            <span>
                                <span style={{ marginRight: 24 }}>
                                    <FormattedMessage id='commonandfields.department' />：
                            {item.department}
                                </span>
                                <span>
                                    <FormattedMessage id='commonandfields.doctor' />：
                            {item.doctorName}
                                </span>
                            </span>
                            <span>
                                <FormattedMessage id='commonandfields.mobile' />：
                            {item.mobile}
                            </span>
                        </div>
                    }
                />
            </Card>
        </div>
    )

export default CardItem