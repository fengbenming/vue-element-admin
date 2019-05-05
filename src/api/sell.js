import request from '@/utils/request'
export function everyDaySellData(params) {
  return request({
    url: '/magic/sell',
    method: 'get',
    params
  })
}

export function categorySellData(params) {
  return request({
    url: '/magic/categoryBrand',
    method: 'get',
    params
  })
}

export function productSellData(params) {
  return request({
    url: '/magic/productSell',
    method: 'get',
    params
  })
}

export function productPriceChangeData(params) {
  return request({
    url: '/magic/productPriceChange',
    method: 'get',
    params
  })
}

export function productRelatedData(params) {
  return request({
    url: '/magic/productRelatedInfo',
    method: 'get',
    params
  })
}

export function priceSalesTrend(params) {
  return request({
    url: '/magic/priceSalesTrend',
    method: 'get',
    params
  })
}
