import request from '@/utils/request.js'


export function getList(data){
    return request({
        url:"/menus",
        method:"post",
        data
    })
}



export function deleteMenu(data){
    return request({
        url:"/delMenu",
        method:"post",
        data
    })
}

export function addMenu(data){
    return request({
        url:"/addMenu",
        method:"post",
        data
    })
}

export function editMenu(data){
    return request({
        url:"/editMenu",
        method:"post",
        data
    })
}

