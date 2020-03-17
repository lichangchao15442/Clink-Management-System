import { Request, Response } from 'express'

let users = [
    {
        mobile: '12345678900',
        password: 'admin',
        authority: 'admin'
    },
    {
        mobile: '12345678901',
        password: 'user',
        authority: 'user'
    },
]

function getFakeCaptcha(req: Request, res: Response) {
    return res.json('15442')
}

export default {
    // 支持Object和Array
    'GET /api/currentUser': {
        name: 'lichangchao',
        avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584110269012&di=6acdc310b374d5f42687b0922740f1c6&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201709%2F10%2F20170910200644_KhWkj.jpeg',
        userid: '00000001',
        email: 'lichangchao@yy.com',
        signature: '小呆逼',
        title: '李最火',
    },
    'POST /api/login/account': (req: Request, res: Response) => {
        const { mobile, password } = req.body
        const user = users.find(item => {
            return item.mobile === mobile
        })
        if (user && user.password === password) {
            res.send({
                status: 'ok',
                currentAuthority: user.authority
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
                currentAuthority: user.authority
            })
        } else {
            res.send({
                status: 'error',
                currentAuthority: 'guest'
            })
        }
    }
}