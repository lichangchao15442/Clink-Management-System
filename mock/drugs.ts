/*
 * @Author: huxiaowen 
 * @Date: 2020-04-13 05:28:25 
 * @Last Modified by: huxiaowen
 * @Last Modified time: 2020-04-16 06:09:26
 */
import { Request, Response } from 'express'
import Mock, { Random } from 'mockjs'

Random.extend({
    prescriptionType() {
        return this.pick([10001800, 10001801, 10001802])
    },
})

/**
 * 到一个两数之间的随机整数，包括两个数在内
 * @param min 范围最小值
 * @param max 范围最大值
 */
const getRandomIntInclusive = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; // 含最大值，含最小值 
}

/**
 * 随机返回数组中的某个值
 * @param arr 数组
 */
const getValue = (arr: Array<any>) => {
    const index = getRandomIntInclusive(0, arr.length - 1)
    return arr[index]
}

const getDrugType = (prescriptionType: number | string) => {
    let arr: Array<number> = []
    switch (prescriptionType) {
        case 10001801:
            arr = [10002200, 10002201, 10002202, 10002203]
            break;
        case 10001802:
            arr = [10002300, 10002301, 10002302, 10002303]
            break;

        default:
            arr = [10002100, 10002101, 10002102, 10002103]
            break;
    }
    return getValue(arr)
}

const getDrugName = (drugType: any) => {
    let drugName
    switch (drugType) {
        case 10002100:
        case 10002102:
            drugName = getValue(['止咳露小盒', '止咳露中盒', '牡蛎碳酸钙颗粒小盒'])
            break;
        case 10002101:
        case 10002103:
            drugName = getValue(['盐酸雷尼替丁胶囊小盒', '牡蛎碳酸钙颗粒中盒', '2#胶壳(克拉霉素)'])
            break;
        case 10002200:
        case 10002202:
            drugName = getValue(['矮地茶', '阿胶', '艾叶', '白扁豆'])
            break;
        case 10002201:
            drugName = getValue(['阿胶珠', '桉油', '荜茇', '半边莲', '北柴胡', '巴豆'])
            break;
        case 10002203:
            drugName = getValue(['荜茇免煎颗粒', '艾叶炭免煎颗粒', '艾叶免煎颗粒', '白背叶根免煎颗粒', '白丑免煎颗粒', '阿胶免煎颗粒'])
            break;
        case 10002300:
        case 10002302:
            drugName = getValue(['针灸理疗费', '塑钢牙', '心电图', '脱敏'])
            break;
        case 10002301:
        case 10002303:
            drugName = getValue(['局部推拿', '根管再治疗术', '拔牙', '补牙'])
            break;
        default:

            break;
    }
    return drugName
}

const getSpecification = (prescriptionType: number | string) => {
    let specification
    switch (prescriptionType) {
        case 10001800:
            specification = getValue(['12g', '13g', '14g', '15g', '16g'])
            break;
        case 10001801:
            specification = getValue(['12g', '13g', '14g', '15g', '16'])
            break;

        default:
            break;
    }
    return specification
}

const getStock = (prescriptionType: number | string) => {
    let stock
    switch (prescriptionType) {
        case 10001800:
            stock = 1000
            break;
        case 10001801:
            stock = '302g'
            break;

        default:
            break;
    }
    return stock
}

const getUnit = (prescriptionType: number | string) => {
    let unit
    if (prescriptionType === 10001802) {
        unit = getValue(['支', '次'])
    }
    return unit
}


const drugs = Mock.mock({
    'data|40-60': [
        {
            'id|+1': 100000,
            prescriptionType: '@prescriptionType',
            drugType() {
                const { prescriptionType } = this
                return getDrugType(prescriptionType)
            },
            drugName() {
                return getDrugName(this.drugType)
            },
            specification() {
                const { prescriptionType } = this
                return getSpecification(prescriptionType)
            },
            stock() {
                const { prescriptionType } = this
                return getStock(prescriptionType)
            },
            'price|2-200': 1,
            unit() {
                const { prescriptionType } = this
                return getUnit(prescriptionType)
            }
        }
    ]
})


export default {
    'GET /api/queryDrugs': (req: Request, res: Response) => {
        const { query } = req
        console.log('query', query)
        let newData = drugs.data
        Object.keys(query).forEach(key => {
            if (Object.hasOwnProperty.call(query, key)) {
                newData = newData.filter((item: A<O>) => {
                // bug: 此处将drugName放在下面，会不执行
                if (key === 'drugName') {
                    return item[key].indexOf(query[key])!=-1
                }
                if (key === 'prescriptionType' || 'drugType') {
                    return item[key] === Number(query[key])
                }
                return true
            })
            }
        })
        console.log(newData)
        res.send({data:newData})
    }
}