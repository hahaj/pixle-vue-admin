import request from '@/utils/request.js'


export function login(data){
    return request({
        url:"/login",
        method:"post",
        data
    })
}

//获取用户信息
export function getUserInfo(data){
    return request({
        url:"/userinfo",
        method:"post",
        data
    })
}


//获取动态路由
export function getAsyncRouter(data){
    return request({
        url:"/async_routers",
        method:"post",
        data
    })
}

//获取所有按钮权限
export function getPermissionBtns(data){
    return request({
        url:"/permission_btns",
        method:"post",
        data
    })
}


