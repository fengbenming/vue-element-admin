import request from '@/utils/request'

export function brandChoise(params) {
  return request({
    url: '/api/brand/choise',
    method: 'get',
    params
  })
}

export function confirmBrand(params) {
  return request({
    url: '/api/brand/confirm',
    method: 'get',
    params
  })
}

export function productChoise(params) {
  return request({
    url: '/api/getTwo',
    method: 'get',
    params
  })
}

export function productConfirm(params, relationType) {
  return request({
    url: '/api/confirm?relationType=' + relationType,
    method: 'post',
    params
  })
}
