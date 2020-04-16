import React from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { Card, List } from 'antd'
import { connect } from 'dva'
import { formatMessage } from 'umi-plugin-react/locale'
import { Dispatch } from 'redux'

import { vipLevels, visitStatus, departments } from '@/utils/dataDictionary'
import { handleRefresh } from '@/utils/utils'
import { ModelState, outpatientRecordsType } from './data'
import Filter from './components/Filter'
import CardItem from './components/CardItem'

import styles from './index.less'


interface WorkplaceProps {
    dispatch: Dispatch<any>;
    workplace: ModelState;
    loading: boolean;
    location: {
        pathname: string;
        query: any;
    };
}

export interface fieldsParam {
    createTime?: string[];
    visitStatus?: string;
    patientName?: string | null;
}

const Workplace: React.FC<WorkplaceProps> = props => {
    const { workplace, location } = props
    const { outpatientRecordsList, total } = workplace
    const { pathname, query } = location

    const paginationProps = {
        showQuickJumper: true,
        pageSize: 9,
        total,
        showTotal: (totals: number) => `每页9条，共${totals}条`
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
        onFilterChange: (fields: fieldsParam) => {
            handleRefresh(pathname, query, fields)
        },
        filters: query
    }
    return (
        <PageHeaderWrapper>
            <Card
                className={styles.main}
                extra={<Filter {...FilterProps} />}>
                <List
                    grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
                    dataSource={newOutpatientRecordsList}
                    pagination={total ? paginationProps : false}
                    renderItem={(item: outpatientRecordsType) => {
                        if (item) {
                            return (
                                <List.Item key={item.id}>
                                    <CardItem item={item} />
                                </List.Item>
                            )
                        }
                        return null
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