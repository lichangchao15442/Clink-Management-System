import React, { useState, useEffect } from 'react'
import { Card, Table, ConfigProvider, Button, message } from 'antd'
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale'
import { PlusCircleFilled, ExclamationCircleFilled } from '@ant-design/icons'
import { connect } from 'dva'
import { Dispatch } from 'redux'

import { ageUnits, familyRelationships } from '@/utils/dataDictionary'
import ModalConfirm from '@/components/ModalConfirm'
import CreateForm from './components/CreateForm'
import { patientManagementState } from '../../../data'
import styles from '../../index.less'


interface AssociateFamilyMemberProps {
    dispatch: Dispatch<any>;
    patientManagement: patientManagementState;
    getFamilyData: (family: any) => void;
}

const AssociateFamilyMember: React.FC<AssociateFamilyMemberProps> = props => {
    const { patientManagement, dispatch, getFamilyData } = props
    const { patients } = patientManagement
    const [visible, setVisible] = useState(false)
    const [data, setData] = useState([])

    const handleDisassociate = (record: any) => {
        const title = formatMessage({ id: 'commonandfields.association.cancel.confirm' })
        const content = <span>
            <ExclamationCircleFilled style={{ color: '#FFD149', fontSize: 16, marginRight: 10 }} />
            {formatMessage({ id: 'commonandfields.association.cancel.confirm.content' })}
        </span>
        const onOk = () => {
            const newData = data.filter(_ => _.id !== record.id)
            setData(newData)
            // 将子组件搭table data及时传给父组件
            getFamilyData(newData)
            message.success(formatMessage({ id: 'commonandfields.association.cancel' }))
        }
        ModalConfirm({ title, content, onOk })
    }

    const columns = [
        {
            title: formatMessage({ id: 'commonandfields.serialNumber' }),
            dataIndex: 'key',
        },
        {
            title: formatMessage({ id: 'commonandfields.familyRelationship' }),
            dataIndex: 'familyRelationship',
        },
        {
            title: formatMessage({ id: 'patientandmanagement.patientName' }),
            dataIndex: 'name',
        },
        {
            title: formatMessage({ id: 'commonandfields.gender' }),
            dataIndex: 'gender',
        },
        {
            title: formatMessage({ id: 'commonandfields.age' }),
            dataIndex: 'age',
        },
        {
            title: formatMessage({ id: 'commonandfields.employer' }),
            dataIndex: 'employer',
            width: 100
        },
        {
            title: formatMessage({ id: 'commonandfields.birthday' }),
            dataIndex: 'birthday',
        },
        {
            title: formatMessage({ id: 'commonandfields.mobile' }),
            dataIndex: 'mobile',
        },
        {
            title: formatMessage({ id: 'commonandfields.createTime' }),
            dataIndex: 'createTime',
        },
        {
            title: formatMessage({ id: 'commonandfields.operate' }),
            key: 'operate',
            // fixed: 'right',
            render: (text, record) => (
                <span className={styles.operate}>
                    <a><FormattedMessage id='commonandfields.check' /></a>
                    <a><FormattedMessage id='commonandfields.edit' /></a>
                    <a onClick={() => handleDisassociate(record)}><FormattedMessage id='commonandfields.disassociate' /></a>
                </span>
            ),
        },
    ];

    useEffect(() => {
        dispatch({
            type: 'patientManagement/fetchPatients'
        })
    }, [])

    // table为空时显示内容
    const TableRenderEmpty = () => (
        <div className={styles.addFamilyMember}>
            <Button
                icon={<PlusCircleFilled />}
                onClick={() => setVisible(true)}
            >
                <FormattedMessage id='commonandfields.addFamilyMember' />
            </Button>
        </div >
    )

    // patients数据处理
    const newPatients = patients.map(item => {
        const gender = item.gender === 0 ?
            formatMessage({ id: 'dataanddictionary.gender.male' }) :
            formatMessage({ id: 'dataanddictionary.gender.female' })
        const ageUnitItem = ageUnits.find(_ => _.key === item.ageUnit)
        const ageUnit = ageUnitItem && ageUnitItem.label
        const ageAndAgeUnit = `${item.age}${ageUnit}`
        return {
            ...item,
            genderText:gender,
            ageAndAgeUnit,
        }
    })

    const handleAdd = (fields: any) => {
        const familyMember = newPatients.find(_ => fields.patientName === _.id)
        const familyRelationshipItem = familyRelationships.find(_ => fields.familyRelationship === _.key)
        const newFamilyMember = {
            ...familyMember,
            familyRelationship: familyRelationshipItem?.label
        }
        // 注意：此处不能直接修改data，需要重新创建一个对象。（否则，页面不会重新渲染）
        let newData = [
            ...data,
            newFamilyMember
        ]

        newData = newData.map((item, index) => ({
            ...item,
            key: index + 1
        }))

        setVisible(false)
        setData(newData)
        // 将子组件搭table data及时传给父组件
        getFamilyData(newData)
        message.success(formatMessage({ id: 'commonandfields.association.success' }))
    }

    const handleCancel = () => {
        setVisible(false)
    };


    return (
        <Card
            className='card-title'
            bordered={false}
            title={formatMessage({ id: 'commonandfields.associateFamilyMember' })}
        >
            <ConfigProvider renderEmpty={TableRenderEmpty}>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                // scroll={{ x: 1500 }}
                />
            </ConfigProvider>
            {data.length ? <TableRenderEmpty /> : null}
            <CreateForm
                visible={visible}
                handleAdd={handleAdd}
                handleCancel={handleCancel}
                patients={newPatients}
            />
        </Card>
    )
}

export default connect(({ patientManagement }
    : { patientManagement: patientManagementState }) => ({
        patientManagement
    }))(AssociateFamilyMember)