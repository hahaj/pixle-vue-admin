//角色列表
const getRoleList = {
    url: "/roles",
    type: "post",
    response: () => {
        return {
            code: 1,
            data:{
                list: [{
                    name:'超级管理员',
                    desc:'拥有所有权限',
                    tag:'adminer',
                    update_time:'2021-12-12 09:15:00',
                    status:1,
                    id:1,
                    route_id:'3,4,5,8,9,10,6,11,12,13,7,14,20'
                },
                {
                    name:'普通用户',
                    tag:'ordinuser',
                    desc:'拥有查看权限',
                    update_time:'2021-12-12 13:20:00',
                    status:1,
                    id:2,
                    route_id:'3'
                }],
                total:2
            }
        }
    }
}



//删除角色
const deleteRole={
    url: "/delRole",
    type: "post",
    response: () => {
        return {
            code: 1,
            data:'',
            msg:'删除成功'
        }
    }
}

//添加角色
const addRole={
    url: "/addRole",
    type: "post",
    response: () => {
        return {
            code: 1,
            data:'',
            msg:'添加成功'
        }
    }
}


//编辑角色
const editRole={
    url: "/editRole",
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
    getRoleList,
    deleteRole,
    addRole,
    editRole
]