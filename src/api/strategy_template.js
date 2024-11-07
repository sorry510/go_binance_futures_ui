import request from '@/utils/request'

export function getList(query = {}) {
  return request({
    url: '/strategy-templates',
    method: 'get',
    params: query
  })
}

export function editData(id, data) {
  return request({
    url: `/strategy-templates/${id}`,
    method: 'put',
    data
  })
}

export function addData(data) {
  return request({
    url: `/strategy-templates`,
    method: 'post',
    data
  })
}

export function delData(id) {
  return request({
    url: `/strategy-templates/${id}`,
    method: 'delete'
  })
}

export function testStrategyRule(symbol, data) {
  return request({
    url: `/strategy-templates/test/${symbol}`,
    method: 'post',
    data
  })
}

