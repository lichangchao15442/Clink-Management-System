import React from 'react'
import { Card } from 'antd'
import { formatMessage } from 'umi-plugin-react/locale'
import {
    Chart,
    Geom,
    Axis,
    Coord,
    Legend,
    Guide,
} from "bizcharts";
import DataSet from "@antv/data-set";

import { MemberSpendingProps } from '../data.d'


const { DataView } = DataSet;
const { Html } = Guide;

const MemberSpending = ({ data }: MemberSpendingProps) => {

    const dv = new DataView();
    dv.source(data).transform({
        type: "percent",
        field: "count",
        dimension: "type",
        as: "percent"
    });
    const cols = {
        percent: {
            formatter: val => {
                val = val * 100 + "%";
                return val;
            }
        }
    };

    const contentTitle = formatMessage({ id: 'businessandoverview.memberSpending.innerTitle' })
    let total = 0
    data.forEach(item => {
        total += item.count
    })
    const htmlContent = `<div style=color:#999999;font-size:8px;text-align:center;>${contentTitle}<br>
    <span style=color:#333333;font-size:20px;font-weight:700>¥${total.toFixed(2)}</span>
    </div>`
    return (
        <Card
            title={formatMessage({ id: 'businessandoverview.memberSpending.proportion' })}
            style={{ height: 370 }}
        >
            {data.length && <Chart
                height={270}
                data={dv}
                scale={cols}
                padding={[0, 0, 130, 0]}
                // padding='auto'
                forceFit
            >
                <Coord type={"theta"} radius={1} innerRadius={0.7} />
                <Axis name="percent" />
                <Legend
                    position="bottom-center"
                    layout='vertical'
                    textStyle={{
                        fill: '#333', // 文本的颜色
                        fontSize: '12', // 文本大小
                    }}
                    itemFormatter={val => {
                        const dataItem = data.find(item => item.type === val)
                        const percent = ((dataItem.count / total) * 100).toFixed(2) + '%'
                        return val + formatMessage({ id: 'businessandoverview.memberSpending.consumption' }) + percent; // val 为每个图例项的文本值
                    }}
                />
                <Guide>
                    <Html
                        position={["50%", "50%"]}
                        html={htmlContent}
                        alignX="middle"
                        alignY="middle"
                    />
                </Guide>
                <Geom
                    type="intervalStack"
                    position="percent"
                    color={['type', ['#28D094', '#FF6262']]}
                />
            </Chart>}
        </Card>
    )
}

export default MemberSpending