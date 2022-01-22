import request from '@/utils/request.js'


export function uploadImage(data){
    return request({
        url:"/upload",
        method:"post",
        data
    })
}