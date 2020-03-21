import { Request, Response } from 'express'

let users = [
    {
        id: '1',
        mobile: '12345678900',
        password: 'admin',
        authority: 'admin',
        name: '李常超',
        avatar: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3550337281,1234656483&fm=15&gp=0.jpg',
        employeeId: '000001',
        age: '30',
        gender: 'male',
        email: '15442@163.com',
        idNumber: '311587198909230071',
        job: '初级医师',
        address: ["江苏省", "南京市", "玄武区"],
        addressDetail: '竹山路工信大厦',
        department: 'general',
        role: 'doctor'

    },
    {
        id: '2',
        mobile: '12345678901',
        password: 'user',
        authority: 'user',
        name: 'Bentley',
        avatar: 'http://img2.imgtn.bdimg.com/it/u=3252118588,652104148&fm=11&gp=0.jpg',
        employeeId: '000002',
        age: '23',
        gender: 'female',
        email: '498555427@163.com',
        idNumber: '53917819970127005x',
        job: '烧伤科主任',
        address: ["江苏省", "南京市", "玄武区"],
        addressDetail: '竹山路工信大厦',
        department: 'pediatrics',
        role: 'doctor'

    },
]


function getFakeCaptcha(req: Request, res: Response) {
    return res.json('15442')
}

export default {
    // 支持Object和Array
    'GET /api/currentUser': (req: Request, res: Response) => {
        const { id } = req.query
        const user = users.find(item => item.id === id)
        res.send(user)
    },
    'POST /api/login/account': (req: Request, res: Response) => {
        const { mobile, password } = req.body
        const user = users.find(item => {
            return item.mobile === mobile
        })
        if (user && user.password === password) {
            res.send({
                status: 'ok',
                currentAuthority: user.authority,
                id: user.id
            })
        } else {
            res.send({
                status: 'error',
                currentAuthority: 'guest'
            })
        }
    },
    'GET /api/login/captcha': getFakeCaptcha,
    'POST /api/reset-password': (req: Request, res: Response) => {
        const { mobile, password } = req.body
        let user = users.find(item => {
            return item.mobile === mobile
        })
        if (user) {
            user.password = password
            res.send({
                status: 'ok',
                currentAuthority: user.authority,
                id: user.id
            })
        } else {
            res.send({
                status: 'error',
                currentAuthority: 'guest'
            })
        }
    },
    'POST /api/change-password': (req: Request, res: Response) => {
        const { id, newPassword, oldPassword } = req.body
        let user = users.find(item => {
            return item.id === id
        })
        if (user) {
            // 进行旧密码的校验
            if (user.password === oldPassword) {
                user.password = newPassword
                res.send({
                    status: 'ok'
                })
            } else {
                res.send({
                    status: 'error'
                })
            }
        }
    },
    'POST /api/account/changeProfile': (req: Request, res: Response) => {
        const { id, oldPassword } = req.body
        users = users.map(user => {
            if (user.id === id) {
                user = { ...user, ...req.body }
                return user
            }
            return user
        })
        const data = users.find(user => user.id === id)
        res.send({
            status: 'ok',
            data
        })
    }
}