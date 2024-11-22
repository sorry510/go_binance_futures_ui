import request from '@/utils/request'

export function getResults(query = {}) {
  return request({
    url: '/test-strategy-results',
    method: 'get',
    params: query,
  })
}

export function delAllResults() {
  return request({
    url: '/test-strategy-results',
    method: 'delete',
  })
}

export function delResults(id) {
  return request({
    url: `/test-strategy-results/${id}`,
    method: 'delete',
  })
}

