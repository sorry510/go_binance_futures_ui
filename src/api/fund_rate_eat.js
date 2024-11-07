import request from '@/utils/request'

export function getList(query = {}) {
  return request({
    url: '/fund-rate/eat',
    method: 'get',
    params: query
  })
}

export function editData(id, data) {
  return request({
    url: `/fund-rate/eat/${id}`,
    method: 'put',
    data
  })
}

export function addData(data) {
  return request({
    url: `/fund-rate/eat`,
    method: 'post',
    data
  })
}

export function delData(id) {
  return request({
    url: `/fund-rate/eat/${id}`,
    method: 'delete'
  })
}

export function start(id) {
  return request({
    url: `/fund-rate/eat/start/${id}`,
    method: 'post'
  })
}

export function end(id) {
  return request({
    url: `/fund-rate/eat/end/${id}`,
    method: 'post'
  })
}
