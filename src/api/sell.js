import request from '@/utils/request'

export function everyDaySellData(params) {
  return request({
    url: 'http://47.97.187.4:8081/magic/sell',
    method: 'get',
    params
  })
}
