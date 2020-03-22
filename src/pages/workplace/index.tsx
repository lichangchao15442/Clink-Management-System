import React, { useEffect } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { Card, List } from 'antd'
import { connect } from 'dva'
import { formatMessage } from 'umi-plugin-react/locale'
import { ModelState, outpatientRecordsType } from './model'
import { vipLevels, visitStatus, departments } from '@/utils/dataDictionary'
import Filter from './components/Filter'
import CardItem from './components/CardItem'

import styles from './index.less'


const Workplace = props => {
    const { dispatch, workplace, loading } = props
    const { outpatientRecordsList, total } = workplace

    useEffect(() => {
        dispatch({
            type: 'workplace/fetch'
        })
    }, [])

    const paginationProps = {
        showQuickJumper: true,
        pageSize: 9,
        total,
        showTotal: (total, range) => `每页9条，共${total}条`
    };

    // 对outpatientRecordsList数据的处理
    const newOutpatientRecordsList = outpatientRecordsList.map(item => {
        const vipLevelItem = vipLevels.find(_ => _.key === item.vipLevel)
        const gender = item.gender === 0 ? formatMessage({ id: 'dataanddictionary.gender.male' })
            : formatMessage({ id: 'dataanddictionary.gender.female' })
        const visitStatusItem = visitStatus.find(_ => _.key === item.visitStatus)
        const departmentItem = departments.find(_ => _.key === item.department)

        return {
            ...item,
            vipLevel: vipLevelItem && vipLevelItem.value,
            gender,
            visitStatus: visitStatusItem && visitStatusItem.label,
            visitStatusColor: visitStatusItem && visitStatusItem.value,
            department: departmentItem && departmentItem.label,
        }
    })

    const FilterProps = {
        onFilterChange: (fields) => {
            dispatch({
                type: 'workplace/fetch',
                payload: fields
            })
        }
    }
    return (
        <PageHeaderWrapper>
            <Card
                className={styles.main}
                extra={<Filter {...FilterProps} />}>
                    <List
                        grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
                        dataSource={newOutpatientRecordsList}
                        pagination={total && paginationProps}
                        renderItem={(item: outpatientRecordsType) => {
                            if (item) {
                                return (
                                    <List.Item key={item.id}>
                                        <CardItem item={item} />
                                    </List.Item>
                                )
                            }
                        }}
                    />
            </Card>
        </PageHeaderWrapper>
    )
}

export default connect(({ workplace, loading }: {
    workplace: ModelState,
    loading: {
        effects: {
            [key: string]: string
        }
    }
}) => ({ workplace, loading: loading.effects['workplace/fetch'] }))(Workplace)