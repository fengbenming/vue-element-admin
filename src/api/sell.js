import request from '@/utils/request'

export function everyDaySellData(params) {
  return request({
    url: 'http://47.97.187.4:8081/magic/sell',
    // url: 'http://localhost:8081/magic/sell',
    method: 'get',
    params
  })
}

export function categorySellData(params) {
  return request({
    url: 'http://47.97.187.4:8081/magic/categoryBrand',
    // url: 'http://localhost:8081/magic/categoryBrand',
    method: 'get',
    params
  })
}

export function productSellData(params) {
  return request({
    url: 'http://47.97.187.4:8081/magic/productSell',
    // url: 'http://localhost:8081/magic/productSell',
    method: 'get',
    params
  })
}

export function productPriceChangeData(params) {
  return request({
    url: 'http://47.97.187.4:8081/magic/productPriceChange',
    // url: 'http://localhost:8081/magic/productPriceChange',
    method: 'get',
    params
  })
}

export function productRelatedData(params) {
  return request({
    url: 'http://47.97.187.4:8081/magic/productRelatedInfo',
    // url: 'http://localhost:8081/magic/productRelatedInfo',
    method: 'get',
    params
  })
}
