//管理员列表
const getUserList = {
    url: "/userList",
    type: "post",
    response: () => {
        return {
            code: 1,
            data:{
                list: [{
                    account:'admin',
                    avatar:'https://img1.baidu.com/it/u=984185799,2448847625&fm=26&fmt=auto',
                    role:'超级管理员',
                    email:'8888@qq.com',
                    nickname:'管理员',
                    update_time:'2021-12-11 13:15:00',
                    password:'123456',
                    id:1
                },
                {
                    account:'edit',
                    avatar:'https://img2.baidu.com/it/u=108873797,3648956551&fm=26&fmt=auto',
                    role:'普通用户',
                    email:'9999@qq.com',
                    nickname:'流沙',
                    password:'123456',
                    update_time:'2021-12-11 13:20:00',
                    id:2
                },{
                    account:'test',
                    avatar:'https://img2.baidu.com/it/u=3040806668,3530314524&fm=26&fmt=auto',
                    role:'普通用户',
                    nickname:'忘忧草',
                    email:'0000@qq.com',
                    password:'123456',
                    update_time:'2021-12-11 13:30:00',
                    id:3
                }],
                total:3
            }
        }
    }
}

//所有角色
const getRoles = {
    url: "/roleList",
    type: "post",
    response: () => {
        return {
            code: 1,
            data: [{
                id:1,
                name:'超级管理员'
                
            },{
                id:2,
                name:'普通用户'
                
            }]
        }
    }
}

//删除管理员
const deleteUser={
    url: "/delUser",
    type: "post",
    response: () => {
        return {
            code: 1,
            data:'',
            msg:'删除成功'
        }
    }
}

//添加管理员
const addUser={
    url: "/addUser",
    type: "post",
    response: () => {
        return {
            code: 1,
            data:'',
            msg:'添加成功'
        }
    }
}


//编辑管理员
const editUser={
    url: "/editUser",
    type: "post",
    response: () => {
        return {
            code: 1,
            data:'',
            msg:'编辑成功'
        }
    }
}




module.exports = [
    getUserList,
    getRoles,
    deleteUser,
    addUser,
    editUser,
 
]