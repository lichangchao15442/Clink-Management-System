import React, { Suspense, useState } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { Card, Row, Col } from 'antd'
import { connect } from 'dva'
import { formatMessage } from 'umi-plugin-react/locale'
import { Dispatch } from 'redux'

import registered from '@/assets/registered.png'
import admission from '@/assets/admission.png'
import income from '@/assets/income.png'
import newVips from '@/assets/newVips.png'

import { StateType, introduceRowProps } from './data'

import PageLoading from './components/PageLoading'


import styles from './index.less'


const IntroduceRow = React.lazy(() => import('./components/IntroduceRow'))
const IncomeTrend = React.lazy(() => import('./components/IncomeTrend'))
const MemberSpending = React.lazy(() => import('./components/MemberSpending'))
const OutpatientRecords = React.lazy(() => import('./components/OutpatientRecords'))

const topColResponsiveProps = {
    xs: 24,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 6,
}

const cardLogosSrc = {
    registered,
    admission,
    income,
    newVips
}

const cardLogosColor = {
    registered: '#F0F1FD',
    admission: '#FFF0F0',
    income: '#EAFAF5',
    newVips: '#FFFAE9',
}


interface BusinessOverviewProps {
    loading: boolean;
    dispatch: Dispatch;
    businessOverview: StateType;
}

const BusinessOverview: React.FC<BusinessOverviewProps> = props => {
    const { businessOverview, loading, dispatch } = props
    const {
        incomeTrendWeek,
        incomeTrendMonth,
        memberSpendingData,
    } = businessOverview
    let { introduceData, outpatientRecordsData } = businessOverview
    const [time, setTime] = useState('week')


    // 对introduceData数据处理
    introduceData = introduceData.map(item => {
        const title = formatMessage({ id: `businessandoverview.introduce.${item.name}` })
        return {
            ...item,
            title,
            logoSrc: cardLogosSrc[item.name],
            logoColor: cardLogosColor[item.name]
        }
    })

    const IntroduceRows = introduceData.map((item: introduceRowProps) => (
        <Col key={item.name} {...topColResponsiveProps} >
            <IntroduceRow loading={loading} {...item} />
        </Col>
    ))

    // 对memberSpendingData数据的处理
    const memberSpendingNewData = memberSpendingData.map(item => {
        const type = formatMessage({ id: `businessandoverview.memberSpending.${item.type}` })
        return {
            ...item,
            type
        }
    })

    // 对outpatientRecordsData数据的处理
    outpatientRecordsData = outpatientRecordsData.map((item, index) => ({
        ...item,
        key: index + 1
    }))

    // outpatientRecordsData.forEach((item, key) => { item.key = key + 1 })

    const handleTime = (type: string) => {
        setTime(type)
        dispatch({
            type: 'businessOverview/fetchIncomeTrend',
            payload: type
        })
    }

    const incomeTrendProps = {
        time,
        handleTime,
        data: time === 'week' ? incomeTrendWeek : incomeTrendMonth
    }

    const memberSpendingProps = {
        data: memberSpendingNewData,
    }

    const outpatientRecordsProps = {
        dataSource: outpatientRecordsData,
        loading,
        pagination: {
            total: outpatientRecordsData.length,
            showQuickJumper: true,
            pageSize: 10,
            showTotal: (total: number) => `每页10条，共${total}条`
        }
    }


    return (
        <PageHeaderWrapper>
            <Card className={styles.card}>
                <Row gutter={24}>
                    <Suspense fallback={<PageLoading />}>
                        {IntroduceRows}
                    </Suspense>
                </Row>
                <Row gutter={24}>
                    <Col xl={18} lg={24} md={24} sm={24} xs={24}>
                        <Suspense fallback={null}>
                            <IncomeTrend {...incomeTrendProps} />
                        </Suspense>
                    </Col>
                    <Col xl={6} lg={24} md={24} sm={24} xs={24}>
                        <Suspense fallback={null}>
                            <MemberSpending {...memberSpendingProps} />
                        </Suspense>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Suspense fallback={null}>
                            <OutpatientRecords {...outpatientRecordsProps} />
                        </Suspense>
                    </Col>
                </Row>
            </Card>
        </PageHeaderWrapper>
    )
}

export default connect(({ businessOverview, loading }: {
    businessOverview: StateType,
    loading: {
        effects: { [key: string]: string }
    }
}) => ({
    businessOverview,
    loading: loading.effects['businessOverview/fetch']
}
    ))(BusinessOverview)
