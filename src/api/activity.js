import request from '@/utils/request'
export function manageActivity(params) {
    return request({
        url: '/magic/manageActivity',
        method: 'get',
        params
    })
}

export function statisticActivity(params) {
    return request({
        url: '/magic/statisticActivity',
        method: 'get',
        params
    })
}
