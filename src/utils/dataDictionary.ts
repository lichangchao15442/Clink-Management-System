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

export const registrationFeeOptions = [
    {
        key: 10001300,
        label: formatMessage({ id: 'registrationandmanagement.addandregistered.registrationFee.free' }),
        value: 0
    },
    {
        key: 10001301,
        label: formatMessage({ id: 'registrationandmanagement.addandregistered.registrationFee.normal' }),
        value: 10
    },
    {
        key: 10001302,
        label: formatMessage({ id: 'registrationandmanagement.addandregistered.registrationFee.expert' }),
        value: 20
    },
]

export const medicalFeeOptions = [
    {
        key: 10001400,
        label: formatMessage({ id: 'registrationandmanagement.addandregistered.medicalFee.free' }),
        value: 0
    },
    {
        key: 10001401,
        label: formatMessage({ id: 'registrationandmanagement.addandregistered.medicalFee.notFree' }),
        value: 50
    },
]

// 与visitStatus类似，但是没有接诊中，但有已退号
export const AttendanceStatus = [
    {
        key: 10001500,
        label: formatMessage({ id: 'dataanddictionary.attendanceStatus.pending' }),
        value: 'pending'
    },
    {
        key: 10001501,
        label: formatMessage({ id: 'dataanddictionary.attendanceStatus.consulted' }),
        value: 'consulted'
    },
    {
        key: 10001502,
        label: formatMessage({ id: 'dataanddictionary.attendanceStatus.bounced' }),
        value: 'bounced'
    },
]

export const diagnosticResults = [
    {
        key: 10001600,
        label: formatMessage({ id: 'dataanddictionary.diagnosticResults.epidemicHemorrhagicFever' }),
        value: 'epidemicHemorrhagicFever'
    },
    {
        key: 10001601,
        label: formatMessage({ id: 'dataanddictionary.diagnosticResults.acuteBronchitis' }),
        value: 'acuteBronchitis'
    },
    {
        key: 10001602,
        label: formatMessage({ id: 'dataanddictionary.diagnosticResults.upperRespiratoryTractInfection' }),
        value: 'upperRespiratoryTractInfection'
    },
    {
        key: 10001603,
        label: formatMessage({ id: 'dataanddictionary.diagnosticResults.pharyngitis' }),
        value: 'pharyngitis'
    },
    {
        key: 10001604,
        label: formatMessage({ id: 'dataanddictionary.diagnosticResults.acuteGastroenteritis' }),
        value: 'acuteGastroenteritis'
    },
    {
        key: 10001605,
        label: formatMessage({ id: 'dataanddictionary.diagnosticResults.irregularMenstruation' }),
        value: 'irregularMenstruation'
    },
    {
        key: 10001606,
        label: formatMessage({ id: 'dataanddictionary.diagnosticResults.acuteTonsillitis' }),
        value: 'acuteTonsillitis'
    },
    {
        key: 10001607,
        label: formatMessage({ id: 'dataanddictionary.diagnosticResults.JapaneseEncephalitis' }),
        value: 'JapaneseEncephalitis'
    },
    {
        key: 10001608,
        label: formatMessage({ id: 'dataanddictionary.diagnosticResults.diphtheria' }),
        value: 'diphtheria'
    },
    {
        key: 10001609,
        label: formatMessage({ id: 'dataanddictionary.diagnosticResults.meningitis' }),
        value: 'meningitis'
    },
]

export const medicalAdvices = [
    {
        key: 10001700,
        label: formatMessage({ id: 'dataanddictionary.medicalAdvices.Low_saltLow_pondDiet' }),
        value: 'Low_saltLow_pondDiet'
    },
    {
        key: 10001701,
        label: formatMessage({ id: 'dataanddictionary.medicalAdvices.avoidColdAndOtherFoods' }),
        value: 'avoidColdAndOtherFoods'
    },
    {
        key: 10001702,
        label: formatMessage({ id: 'dataanddictionary.medicalAdvices.avoidColdHair' }),
        value: 'avoidColdHair'
    },
    {
        key: 10001703,
        label: formatMessage({ id: 'dataanddictionary.medicalAdvices.lessSugar' }),
        value: 'lessSugar'
    },
    {
        key: 10001704,
        label: formatMessage({ id: 'dataanddictionary.medicalAdvices.avoidStayingUpLateAndAvoidDrinking' }),
        value: 'avoidStayingUpLateAndAvoidDrinking'
    },
    {
        key: 10001705,
        label: formatMessage({ id: 'dataanddictionary.medicalAdvices.drinkMoreWater' }),
        value: 'drinkMoreWater'
    },
    {
        key: 10001706,
        label: formatMessage({ id: 'dataanddictionary.medicalAdvices.avoidSpicy' }),
        value: 'avoidSpicy'
    },
]


export const prescriptionTypes = [
    {
        key: 10001800,
        label: formatMessage({ id: 'dataanddictionary.prescriptionTypes.WesternOrMedicinePrescription' }),
        value: 'WesternOrMedicinePrescription'
    },
    {
        key: 10001801,
        label: formatMessage({ id: 'dataanddictionary.prescriptionTypes.ChineseMedicinePrescription' }),
        value: 'ChineseMedicinePrescription'
    },
    {
        key: 10001802,
        label: formatMessage({ id: 'dataanddictionary.prescriptionTypes.CheckItem' }),
        value: 'CheckItem'
    }
]

export const usages = [
    {
        key: 10001900,
        label: formatMessage({ id: 'dataanddictionary.usages.oral' }),
        value: 'oral'
    },
    {
        key: 10001901,
        label: formatMessage({ id: 'dataanddictionary.usages.intravenousInjection' }),
        value: 'intravenousInjection'
    },
    {
        key: 10001902,
        label: formatMessage({ id: 'dataanddictionary.usages.injectingDrugs' }),
        value: 'injectingDrugs'
    },
    {
        key: 10001903,
        label: formatMessage({ id: 'dataanddictionary.usages.check' }),
        value: 'check'
    },
    {
        key: 10001904,
        label: formatMessage({ id: 'dataanddictionary.usages.skinTest' }),
        value: 'skinTest'
    },
    {
        key: 10001905,
        label: formatMessage({ id: 'dataanddictionary.usages.externalUse' }),
        value: 'externalUse'
    },
    {
        key: 10001906,
        label: formatMessage({ id: 'dataanddictionary.usages.atomization' }),
        value: 'atomization'
    },
]


export const frequencies = [
    {
        key: 10002000,
        label: formatMessage({ id: 'dataanddictionary.frequencies.onceADay' }),
        value: 'onceADay'
    },
    {
        key: 10002001,
        label: formatMessage({ id: 'dataanddictionary.frequencies.twoTimesADay' }),
        value: 'twoTimesADay'
    },
    {
        key: 10002002,
        label: formatMessage({ id: 'dataanddictionary.frequencies.threeTimesADay' }),
        value: 'threeTimesADay'
    },
    {
        key: 10002003,
        label: formatMessage({ id: 'dataanddictionary.frequencies.fourTimesADay' }),
        value: 'fourTimesADay'
    },
    {
        key: 10002004,
        label: formatMessage({ id: 'dataanddictionary.frequencies.onceEveryTwoHours' }),
        value: 'onceEveryTwoHours'
    },
    {
        key: 10002005,
        label: formatMessage({ id: 'dataanddictionary.frequencies.onceEveryFourHours' }),
        value: 'onceEveryFourHours'
    },
    {
        key: 10002006,
        label: formatMessage({ id: 'dataanddictionary.frequencies.onceEverySixHours' }),
        value: 'onceEverySixHours'
    },
]

export const westernMedicineTypes = [
    {
        key: 10002100,
        label: formatMessage({ id: 'dataanddictionary.westernMedicineTypes.commonlyUsedDrugs' }),
        value: 'commonlyUsedDrugs'
    },
    {
        key: 10002101,
        label: formatMessage({ id: 'dataanddictionary.westernMedicineTypes.westernMedicine' }),
        value: 'westernMedicine'
    },
    {
        key: 10002102,
        label: formatMessage({ id: 'dataanddictionary.westernMedicineTypes.coldMedicine' }),
        value: 'coldMedicine'
    },
    {
        key: 10002103,
        label: formatMessage({ id: 'dataanddictionary.westernMedicineTypes.material' }),
        value: 'material'
    },
]

export const chineseMedicineTypes = [
    {
        key: 10002200,
        label: formatMessage({ id: 'dataanddictionary.chineseMedicineTypes.chineseHerbalMedicine' }),
        value: 'chineseHerbalMedicine'
    },
    {
        key: 10002201,
        label: formatMessage({ id: 'dataanddictionary.chineseMedicineTypes.heatClearing' }),
        value: 'heatClearing'
    },
    {
        key: 10002202,
        label: formatMessage({ id: 'dataanddictionary.chineseMedicineTypes.detoxification' }),
        value: 'detoxification'
    },
    {
        key: 10002203,
        label: formatMessage({ id: 'dataanddictionary.chineseMedicineTypes.nonFriedGranules' }),
        value: 'nonFriedGranules'
    },
]

export const checkItemTypes = [
    {
        key: 10002300,
        label: formatMessage({ id: 'dataanddictionary.checkItemTypes.treatmentCosts' }),
        value: 'treatmentCosts'
    },
    {
        key: 10002301,
        label: formatMessage({ id: 'dataanddictionary.checkItemTypes.inspectionFee' }),
        value: 'inspectionFee'
    },
    {
        key: 10002302,
        label: formatMessage({ id: 'dataanddictionary.checkItemTypes.materialFee' }),
        value: 'materialFee'
    },
    {
        key: 10002303,
        label: formatMessage({ id: 'dataanddictionary.checkItemTypes.others' }),
        value: 'others'
    },
]