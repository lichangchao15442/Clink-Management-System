import React from 'react'
import { Card, Button } from 'antd'
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale'
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
} from 'bizcharts'

import defaultSetting from '@/../config/defaultSettings'
import { IncomeTrendProps } from '../data.d'

import styles from './IncomeTrend.less'


const cols = {
    value: {
        alias: '单位（元）'
    }
};

const tooltipStyle = 'position:absolute;background-color:#FFC71C;' +
    'width:85px;height:60px;border-radius:4px;text-align:center;color:#fff;padding-top:10px'


const IncomeTrend = ({ time, handleTime, data }: IncomeTrendProps) => {
    return (
        <Card
            style={{ height: 370 }}
            title={formatMessage({ id: 'businessandoverview.incomeTrend.title' })}
            extra={<div className={styles.buttons}>
                <Button className={time === 'week' && styles.btnActive} onClick={() => handleTime('week')}>
                    <FormattedMessage id='businessandoverview.incomeTrend.week' />
                </Button>
                <Button className={time === 'month' && styles.btnActive} onClick={() => handleTime('month')}>
                    <FormattedMessage id='businessandoverview.incomeTrend.month' />
                </Button>
            </div>}
        >
            <div>
                <div className={styles.unit}>
                    <FormattedMessage id='businessandoverview.incomeTrend.unit' />
                </div>
                <Chart height={270} data={data} scale={cols} forceFit padding='auto'>
                    <Axis name="date" tickLine={null} />
                    <Axis name="value" />
                    <Tooltip
                        crosshairs={false}
                        useHtml
                        htmlContent={(title, items) => {
                            return `<div style=${tooltipStyle}>
                            <div style='font-size:12px'>${items[0].title}</div>
                            <div style='font-size:16px'>
                                <span style='margin-right:2px'>¥</span>
                                ${items[0].value}
                            </div>
                        </div>`
                        }}
                    />
                    <Geom type="areaStack" position="date*value" color={['name', ['l (90) 0:rgb(198, 201, 247) 1:rgb(248, 248, 254)']]} />
                    <Geom type="lineStack" position="date*value" size={3} color={['name', defaultSetting.primaryColor]} />
                    <Geom
                        type="point"
                        position="date*value"
                        size={5}
                        shape={"circle"}
                        style={{
                            stroke: "#FFC71C",
                            lineWidth: 3,
                            fill: '#fff'
                        }}
                    />
                </Chart>
            </div>
        </Card>
    )
}

export default IncomeTrend