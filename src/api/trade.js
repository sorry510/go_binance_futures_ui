import request from '@/utils/request'

export function getFeatures(query = {}) {
  return request({
    url: '/features',
    method: 'get',
    params: query
  })
}

export function setFeature(id, data) {
  return request({
    url: `/features/${id}`,
    method: 'put',
    data
  })
}

export function addFeature(data) {
  return request({
    url: `/features`,
    method: 'post',
    data
  })
}

export function delFeature(id) {
  return request({
    url: `/features/${id}`,
    method: 'delete'
  })
}
export function enableFeature(flag = 1) {
  return request({
    url: `/features/enable/${flag}`,
    method: 'put'
  })
}

export function batchEdit(data) {
  return request({
    url: `/features/batch`,
    method: 'put',
    data
  })
}

export function getConfig() {
  return request({
    url: '/config',
    method: 'get'
  })
}

export function setConfig(data) {
  return request({
    url: '/config',
    method: 'put',
    data
  })
}

export function startService() {
  return request({
    url: '/start',
    method: 'post'
  })
}

export function stopService() {
  return request({
    url: '/stop',
    method: 'post'
  })
}
