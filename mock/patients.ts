import Mock from 'mockjs'



function randomNumber(min:number, max:number) {
    return Math.floor(Math.random() * (max - min) + min)
}

export function randomAvatar() {
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

export const patients = Mock.mock({
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
