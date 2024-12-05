import request from '@/utils/request'

export function getOrders(query = {}) {
  return request({
    url: '/orders',
    method: 'get',
    params: query,
  })
}

export function delAllTrade() {
  return request({
    url: '/orders',
    method: 'delete',
  })
}

export function delTrade(id) {
  return request({
    url: `/orders/${id}`,
    method: 'delete',
  })
}

