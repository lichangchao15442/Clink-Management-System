import { Request, Response } from 'express'
import Mock from 'mockjs'
import { patientsType } from './data'


function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function randomAvatar() {
    const avatarList = [
        'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3919792586,2575562352&fm=26&gp=0.jpg',
        'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2974115506,2044780524&fm=26&gp=0.jpg',
        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3249603416,2272704334&fm=26&gp=0.jpg',
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1941403315,3810267570&fm=26&gp=0.jpg',
        'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1623927837,3759599681&fm=26&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1110347155,3107731482&fm=26&gp=0.jpg',
        'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1928209595,2458515969&fm=26&gp=0.jpg',
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2514987911,2694725966&fm=26&gp=0.jpg',
        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3961188352,3110718656&fm=26&gp=0.jpg',
        'https://ww2.sinaimg.cn/bmiddle/0065N4Qlgy1gd1ngjt3mtj30zk0k0h54.jpg',
        'https://ww2.sinaimg.cn/square/0065N4Qlgy1gd1ngprnehj30zk0k0qti.jpg',
        'https://ww1.sinaimg.cn/orj360/005Nf4LQgy1gd1oa49dk0j30u019ctf2.jpg',
        'https://wx3.sinaimg.cn/mw1024/a6be0498ly1gagd6m22waj21bq24hhdt.jpg',
        'https://wx2.sinaimg.cn/mw1024/a6be0498ly1gcn0h7vtxrj20tc16g793.jpg',
        'https://wx3.sinaimg.cn/mw1024/a6be0498ly1gcj93ieamuj20u0140wlm.jpg',
        'https://wx2.sinaimg.cn/mw1024/a6be0498gy1ful82pep31j21ru2tcnpj.jpg',
        'https://wx2.sinaimg.cn/mw1024/a6be0498gy1fpbenfizrjj20qo0zin3d.jpg',


    ]
    return avatarList[randomNumber(0, avatarList.length)]
}

const patients = Mock.mock({
    'data|30-50': [
        {
            'id|+1': 100100,
            name: '@cname()',
            'gender|0-1': 1,
            'age|1-99': 1,
            'ageUnit|10000600-10000602': 1,
            'mobile': /^1[385][1-9]\d{8}/,
            'vipLevel|10000400-10000405': 1,
            employer: '南京艺术学院',
            createTime: '@datetime()',
            birthday: '@datetime()',
            operator: '@cname()',
            avatar() {
                return randomAvatar()
            }
        }
    ]
})

export default {
    'GET /api/queryPatients': (req: Request, res: Response) => {
        const { query } = req
        let newData = patients.data
        Object.keys(query).forEach(key => {
            if ({}.hasOwnProperty.call(query, key)) {
                newData = newData.filter((item: patientsType) => {
                    if (key === 'createTime') {
                        const start = new Date(query[key][0]).getTime()
                        const end = new Date(query[key][1]).getTime()
                        const now = new Date(item[key]).getTime()
                        if (start && end) {
                            return now >= start && now <= end
                        }
                        return true
                    } if (key === 'vipLevel') {
                        const bool = Number(query[key]) === 11111111 ? true : item.vipLevel === Number(query[key])
                        return bool
                    } if (key === 'searchKeywords') {
                        if (!query[key]) {
                            return true
                        }
                        const value = Number(query[key])
                        let bool = true
                        if (value) {
                            // 能转为number说明为mobile
                            bool = item.mobile === query[key]
                        } else {
                            // 否则为患者姓名
                            bool = item.name === query[key]
                        }
                        return bool
                    }
                    return false
                })
            }
        })
        res.send({
            data: newData,
            total: newData.length
        })
    },
    'POST /api/addPatient': (req: Request, res: Response) => {
        const { body } = req
        body.avatar = randomAvatar()
        patients.data.unshift(body)
        res.send({ status: 'ok' })
    },
    'POST /api/deletePatient': (req: Request, res: Response) => {
        const { id } = req.body
        patients.data = patients.data.filter(_ => _.id !== id)
        res.send({ status: 'ok' })
    },
    'POST /api/updatePatient': (req: Request, res: Response) => {
        const { body } = req
        const { id, ...other } = body
        patients.data = patients.data.map((item: patientsType) => {
            if (item.id === id) {
                return {
                    ...item,
                    ...other
                }
            }
            return item
        })
        res.send({ status: 'ok' })
    }
}