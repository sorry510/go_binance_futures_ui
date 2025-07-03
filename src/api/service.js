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

export function getLog(query = {}) {
  return request({
    url: '/pm2-log?key=sorry510',
    method: 'get',
    params: query,
  })
}
