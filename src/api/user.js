import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/magic/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/magic/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/magic/user/logout',
    method: 'post'
  })
}

