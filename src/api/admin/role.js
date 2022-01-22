import request from '@/utils/request.js'


export function getList(data){
    return request({
        url:"/roles",
        method:"post",
        data
    })
}



export function deleteRole(data){
    return request({
        url:"/delRole",
        method:"post",
        data
    })
}

export function addRole(data){
    return request({
        url:"/addRole",
        method:"post",
        data
    })
}

export function editRole(data){
    return request({
        url:"/editRole",
        method:"post",
        data
    })
}

export function getAuthTreeData(data){
    return request({
        url:"/menus",
        method:"post",
        data
    })
}

