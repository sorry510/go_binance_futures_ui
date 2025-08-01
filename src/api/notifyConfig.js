import request from '@/utils/request'

export function getNotifyConfigs(query = {}) {
  return request({
    url: '/notify-config',
    method: 'get',
    params: query,
  })
}

export function setNotifyConfig(id, data) {
  return request({
    url: `/notify-config/${id}`,
    method: 'put',
    data,
  })
}

export function addNotifyConfig(data) {
  return request({
    url: `/notify-config`,
    method: 'post',
    data,
  })
}

export function delNotifyConfig(id) {
  return request({
    url: `/notify-config/${id}`,
    method: 'delete',
  })
}
