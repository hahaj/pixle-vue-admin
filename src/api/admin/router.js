import request from '@/utils/request.js'


export function getAllRouter(data){
    return request({
        url:"/all_routers",
        method:"post",
        data
    })
}