// modules/login.js
const login = {
    url: "/login",
    type: "post",
    response: () => {
        return {
            code: 1,
            data: {
                token:'token'
            }
        }
    }
}

const getUserInfo = {
    url: "/userinfo",
    type: "post",
    response: () => {
        return {
            code: 1,
            data: {
                avatar:'https://img1.baidu.com/it/u=984185799,2448847625&fm=26&fmt=auto',
                nickname:'管理员',
                role:'超级管理员',
                createTime:'2021-12-11 13:15:00',
                email:'8888@qq.com',
                sex:0,
                account:'admin',
                indro:'一只默默无闻的程序猿'
            }
        }
    }
}



module.exports = [
    login,
    getUserInfo,

]