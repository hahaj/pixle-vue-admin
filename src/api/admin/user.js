import request from '@/utils/request.js'


export function getList(data){
    return request({
        url:"/userList",
        method:"post",
        data
    })
}


export function getRoles(data){
    return request({
        url:"/roleList",
        method:"post",
        data
    })
}

export function deleteUser(data){
    return request({
        url:"/delUser",
        method:"post",
        data
    })
}

export function addUser(data){
    return request({
        url:"/addUser",
        method:"post",
        data
    })
}

export function editUser(data){
    return request({
        url:"/editUser",
        method:"post",
        data
    })
}

