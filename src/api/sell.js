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

export function staticsCategorySellData(params) {
  return request({
    url: '/magic/thirdCategorySaleStatics',
    method: 'get',
    params
  })
}

export function ThirdCategorySaleStaticsForSunburst(params) {
  return request({
    url: '/magic/ThirdCategorySaleStaticsForSunburst',
    method: 'get',
    params
  })
}
export function summary(params) {
  return request({
    url: '/magic/summary',
    method: 'get',
    params
  })
}


export function thirdCategorySaleDifferenceStatics(params) {
  return request({
    url: '/magic/ThirdCategorySaleDifferenceStatics',
    method: 'get',
    params
  })
}

export function userSaleStatics(params) {
  return request({
    url: '/magic/UserSaleStatics',
    method: 'get',
    params
  })
}
export function BrandProductSaleStatics(params) {
  return request({
    url: '/magic/BrandProductSaleStatics',
    method: 'get',
    params
  })
}
export function ProductCategorySaleStatics(params) {
  return request({
    url: '/magic/ProductCategorySaleStatics',
    method: 'get',
    params
  })
}
export function BrandSaleStatics(params) {
  return request({
    url: '/magic/BrandSaleStatics',
    method: 'get',
    params
  })
}
export function ProductSaleStatics(params) {
  return request({
    url: '/magic/ProductSaleStatics',
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
