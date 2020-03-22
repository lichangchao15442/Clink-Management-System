import { formatMessage } from 'umi-plugin-react/locale'

// key为数据字典编码，后台返回该编码

export const departments = [
    {
        key: 10000000,
        label: formatMessage({ id: 'dataanddictionary.department.general' }),
        value: 'general'
    },
    {
        key: 10000001,
        label: formatMessage({ id: 'dataanddictionary.department.pediatrics' }),
        value: 'pediatrics'
    },
    {
        key: 10000002,
        label: formatMessage({ id: 'dataanddictionary.department.orthopedics' }),
        value: 'orthopedics'
    },
]

export const roles = [
    {
        key: 10000100,
        label: formatMessage({ id: 'dataanddictionary.role.admin' }),
        value: 'admin'
    },
    {
        key: 10000101,
        label: formatMessage({ id: 'dataanddictionary.role.doctor' }),
        value: 'doctor'
    },
    {
        key: 10000102,
        label: formatMessage({ id: 'dataanddictionary.role.nurse' }),
        value: 'nurse'
    },
    {
        key: 10000103,
        label: formatMessage({ id: 'dataanddictionary.role.frontdesk' }),
        value: 'frontdesk'
    },
    {
        key: 10000104,
        label: formatMessage({ id: 'dataanddictionary.role.finance' }),
        value: 'finance'
    },
]

export const visitStatus = [
    {
        key: 10000200,
        label: formatMessage({ id: 'dataanddictionary.visitStatus.pending' }),
        value: 'pending'
    },
    {
        key: 10000201,
        label: formatMessage({ id: 'dataanddictionary.visitStatus.consulting' }),
        value: 'consulting'
    },
    {
        key: 10000202,
        label: formatMessage({ id: 'dataanddictionary.visitStatus.consulted' }),
        value: 'consulted'
    },
]

export const outpatientTypes = [
    {
        key: 10000300,
        label: formatMessage({ id: 'dataanddictionary.outpatientType.firstVisit' }),
        value: 'firstVisit'
    },
    {
        key: 10000301,
        label: formatMessage({ id: 'dataanddictionary.outpatientType.subsequentVisit' }),
        value: 'subsequentVisit'
    },
]

export const vipLevels = [
    {
        key: 10000400,
        label: formatMessage({ id: 'dataanddictionary.vipLevel.none' }),
        value: 0
    },
    {
        key: 10000401,
        label: formatMessage({ id: 'dataanddictionary.vipLevel.junior' }),
        value: 1,
    },
    {
        key: 10000402,
        label: formatMessage({ id: 'dataanddictionary.vipLevel.senior' }),
        value: 2,
    },
    {
        key: 10000403,
        label: formatMessage({ id: 'dataanddictionary.vipLevel.silver' }),
        value: 3
    },
    {
        key: 10000404,
        label: formatMessage({ id: 'dataanddictionary.vipLevel.gold' }),
        value: 4
    },
    {
        key: 10000405,
        label: formatMessage({ id: 'dataanddictionary.vipLevel.diamond' }),
        value: 5
    },
]


