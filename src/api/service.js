import request from '@/utils/request'

export function getServiceConfig(query = {}) {
  return request({
    url: '/service/config',
    method: 'get',
    params: query,
  })
}

export function editData(data) {
  return request({
    url: `/service/config`,
    method: 'put',
    data,
  })
}

export function testPusher(query = {}) {
  return request({
    url: '/test-pusher',
    method: 'post',
    params: query,
  })
}

