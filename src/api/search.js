import request from '@/utils/request'

export function search(params) {
    return request({
        url: '/magic/search',
        method: 'post',
        params
    })
}
