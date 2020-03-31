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
        value: 0,
        discount: 0
    },
    {
        key: 10000401,
        label: formatMessage({ id: 'dataanddictionary.vipLevel.junior' }),
        value: 1,
        discount: 9.80
    },
    {
        key: 10000402,
        label: formatMessage({ id: 'dataanddictionary.vipLevel.senior' }),
        value: 2,
        discount: 9.50
    },
    {
        key: 10000403,
        label: formatMessage({ id: 'dataanddictionary.vipLevel.silver' }),
        value: 3,
        discount: 9.00
    },
    {
        key: 10000404,
        label: formatMessage({ id: 'dataanddictionary.vipLevel.gold' }),
        value: 4,
        discount: 8.80
    },
    {
        key: 10000405,
        label: formatMessage({ id: 'dataanddictionary.vipLevel.diamond' }),
        value: 5,
        discount: 8.50
    },
]

export const affiliatedClinic = [
    {
        key: 10000500,
        label: formatMessage({ id: 'dataanddictionary.affiliatedClinic.branchOne' }),
        value: 'branchOne'
    },
    {
        key: 10000501,
        label: formatMessage({ id: 'dataanddictionary.affiliatedClinic.branchTwo' }),
        value: 'branchTwo'
    },
]


export const ageUnits = [
    {
        key: 10000600,
        label: formatMessage({ id: 'dataanddictionary.ageUnit.day' }),
        value: 'day'
    },
    {
        key: 10000601,
        label: formatMessage({ id: 'dataanddictionary.ageUnit.month' }),
        value: 'month'
    },
    {
        key: 10000602,
        label: formatMessage({ id: 'dataanddictionary.ageUnit.year' }),
        value: 'year'
    },
]

export const patientSources = [
    {
        key: 10000700,
        label: formatMessage({ id: 'dataanddictionary.patientSource.introduction' }),
        value: 'Introduction'
    },
    {
        key: 10000701,
        label: formatMessage({ id: 'dataanddictionary.patientSource.ad' }),
        value: 'ad'
    },
    {
        key: 10000702,
        label: formatMessage({ id: 'dataanddictionary.patientSource.himself' }),
        value: 'himself'
    },
]

export const maritalStatus = [
    {
        key: 10000800,
        label: formatMessage({ id: 'dataanddictionary.maritalStatus.unmarried' }),
        value: 'unmarried'
    },
    {
        key: 10000801,
        label: formatMessage({ id: 'dataanddictionary.maritalStatus.married' }),
        value: 'married'
    },
    {
        key: 10000802,
        label: formatMessage({ id: 'dataanddictionary.maritalStatus.secret' }),
        value: 'secret'
    },
]


export const educations = [
    {
        key: 10000900,
        label: formatMessage({ id: 'dataanddictionary.educations.belowJuniorHighSchool' }),
        value: 'belowJuniorHighSchool'
    },
    {
        key: 10000901,
        label: formatMessage({ id: 'dataanddictionary.educations.highschool' }),
        value: 'highschool'
    },
    {
        key: 10000902,
        label: formatMessage({ id: 'dataanddictionary.educations.college' }),
        value: 'college'
    },
    {
        key: 10000903,
        label: formatMessage({ id: 'dataanddictionary.educations.undergraduate' }),
        value: 'undergraduate'
    },
    {
        key: 10000904,
        label: formatMessage({ id: 'dataanddictionary.educations.masterDegreeAndAbove' }),
        value: 'masterDegreeAndAbove'
    },
    {
        key: 10000905,
        label: formatMessage({ id: 'dataanddictionary.educations.unspecified' }),
        value: 'unspecified'
    },
]

export const occupations = [
    {
        key: 10001000,
        label: formatMessage({ id: 'dataanddictionary.occupation.worker' }),
        value: 'worker'
    },
    {
        key: 10001001,
        label: formatMessage({ id: 'dataanddictionary.occupation.civilServant' }),
        value: 'civilServant'
    },
    {
        key: 10001002,
        label: formatMessage({ id: 'dataanddictionary.occupation.doctor' }),
        value: 'doctor'
    },
    {
        key: 10001003,
        label: formatMessage({ id: 'dataanddictionary.occupation.teacher' }),
        value: 'teacher'
    },
    {
        key: 10001004,
        label: formatMessage({ id: 'dataanddictionary.occupation.internetPractitioners' }),
        value: 'internetPractitioners'
    },
    {
        key: 10001005,
        label: formatMessage({ id: 'dataanddictionary.occupation.unspecified' }),
        value: 'unspecified'
    },
]

export const familyRelationships = [
    {
        key: 10001100,
        label: formatMessage({ id: 'dataanddictionary.familyRelationship.fatherAndDaughter' }),
        value: 'fatherAndDaughter'
    },
    {
        key: 10001101,
        label: formatMessage({ id: 'dataanddictionary.familyRelationship.motherAndDaughter' }),
        value: 'motherAndDaughter'
    },
    {
        key: 10001102,
        label: formatMessage({ id: 'dataanddictionary.familyRelationship.brothers' }),
        value: 'brothers'
    },
    {
        key: 10001103,
        label: formatMessage({ id: 'dataanddictionary.familyRelationship.sisters' }),
        value: 'sisters'
    },
    {
        key: 10001104,
        label: formatMessage({ id: 'dataanddictionary.familyRelationship.others' }),
        value: 'others'
    },
]

export const paymentMethods = [
    {
        key: 10001200,
        label: formatMessage({ id: 'dataanddictionary.paymentMethod.cash' }),
        value: 'cash'
    },
    {
        key: 10001201,
        label: formatMessage({ id: 'dataanddictionary.paymentMethod.alipay' }),
        value: 'alipay'
    },
    {
        key: 10001202,
        label: formatMessage({ id: 'dataanddictionary.paymentMethod.weChat' }),
        value: 'weChat'
    },
    {
        key: 10001203,
        label: formatMessage({ id: 'dataanddictionary.paymentMethod.bankCard' }),
        value: 'bankCard'
    },
    {
        key: 10001204,
        label: formatMessage({ id: 'dataanddictionary.paymentMethod.vipCard' }),
        value: 'vipCard'
    },
]