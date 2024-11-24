import request from '@/utils/request'

export function getSpots(query = {}) {
  return request({
    url: '/spots',
    method: 'get',
    params: query,
  })
}

export function editSpot(id, data) {
  return request({
    url: `/spots/${id}`,
    method: 'put',
    data,
  })
}

export function addSpot(data) {
  return request({
    url: `/spots`,
    method: 'post',
    data,
  })
}

export function delSpot(id) {
  return request({
    url: `/spots/${id}`,
    method: 'delete',
  })
}
export function enableSpot(flag = 1) {
  return request({
    url: `/spots/enable/${flag}`,
    method: 'put',
  })
}

export function batchEdit(data) {
  return request({
    url: `/spots/batch`,
    method: 'put',
    data,
  })
}

export function testStrategyRule(id, data) {
  return request({
    url: `/spots/strategy-rule/test/${id}`,
    method: 'post',
    data,
  })
}

// export function getSpotAccount(query = {}) {
//   return request({
//     url: '/spots/account',
//     method: 'get',
//     params: query,
//   })
// }

// export function getSpotPositions(query = {}) {
//   return request({
//     url: '/spots/positions',
//     method: 'get',
//     params: query,
//   })
// }

// export function getSpotOpenOrders(query = {}) {
//   return request({
//     url: '/spots/open-orders',
//     method: 'get',
//     params: query,
//   })
// }

