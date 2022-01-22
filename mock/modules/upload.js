//所有角色
const uploadAvatar = {
    url: "/upload",
    type: "post",
    response: () => {
        return {
            code: 1,
            data:"https://img1.baidu.com/it/u=984185799,2448847625&fm=26&fmt=auto"
        }
    }
}


module.exports = [
    uploadAvatar

]